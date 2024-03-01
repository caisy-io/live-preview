"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticPaths = exports.getStaticProps = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Footer_1 = require("../components/footer/Footer");
const Header_1 = require("../components/header/Header");
const PageNotFound_1 = require("../components/page-not-found/PageNotFound");
const Page_1 = require("../components/page/Page");
const client_1 = require("../utils/gql/client");
const q_footer_1 = require("../utils/gql/queries/q_footer");
const q_mega_menu_1 = require("../utils/gql/queries/q_mega_menu");
const q_page_1 = require("../utils/gql/queries/q_page");
const q_slugs_1 = require("../utils/gql/queries/q_slugs");
const q_universal_text_1 = require("../utils/gql/queries/q_universal_text");
const NextjsPage = (props) => {
    const is404 = !props.Page ||
        (!props.isIndexPage &&
            props?.Page?.slug === props?.navigation?.home?.[0]?.slug);
    const getFirstCompHeight = () => {
        switch (props?.Page?.components?.[0]?.__typename) {
            case "CompHeroSlider":
                return { bronze: 1, silver: 1 };
            case "CompPageHeader":
                return { bronze: 0.3, silver: 0.3 };
            default:
                return { bronze: 0.3, silver: 0.3 };
        }
    };
    const homePageSlug = props?.navigation?.home?.[0]
        ?.slug;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [props.navigation && ((0, jsx_runtime_1.jsx)(Header_1.Header, { homePageSlug: homePageSlug, firstCompoentHeight: getFirstCompHeight(), legalSection: props?.footer?.legalSection, ...props.navigation })), props.Page && !is404 && ((0, jsx_runtime_1.jsx)(Page_1.Page, { homePageSlug: homePageSlug, ...props.Page })), is404 && (0, jsx_runtime_1.jsx)(PageNotFound_1.PageNotFound, { homePageSlug: homePageSlug }), props.footer && ((0, jsx_runtime_1.jsx)(Footer_1.Footer, { ...{
                    is404,
                    homePageSlug,
                    footer: props.footer,
                    navigation: props.navigation,
                } }))] }));
};
const getStaticProps = async ({ params, locale = "en", draftMode }) => {
    const client = draftMode || process.env.USE_DRAFT_MODE == "true"
        ? client_1.previewClient
        : client_1.publishedClient;
    if (!params) {
        return {
            revalidate: 1,
            props: {},
        };
    }
    const navQuery = client.query({
        query: q_mega_menu_1.q_mega_menu,
        variables: { locale },
        fetchPolicy: "no-cache",
    });
    let slug = params.slug;
    if (params.isIndexPage) {
        const navRes = await navQuery;
        slug = navRes?.data?.MainNavigation?.home?.[0]?.slug;
    }
    // console.log(` slug`, slug, locale);
    const [resPage, resNav, resFooter, resUniversalText] = await Promise.all([
        client.query({
            query: q_page_1.q_page,
            variables: { slug, locale },
            fetchPolicy: "no-cache",
        }),
        navQuery,
        client.query({
            query: q_footer_1.q_footer,
            variables: { locale },
            fetchPolicy: "no-cache",
        }),
        client.query({
            query: q_universal_text_1.q_universal_text,
            variables: { locale },
            fetchPolicy: "no-cache",
        }),
    ]);
    if (!params?.isIndexPage &&
        resNav?.data?.MainNavigation?.home?.[0]?.slug == params.slug) {
        return {
            redirect: {
                destination: "/",
            },
        };
    }
    return {
        revalidate: 1,
        props: {
            draftMode: !!draftMode,
            isIndexPage: params?.isIndexPage || null,
            navigation: resNav?.data?.MainNavigation || null,
            footer: resFooter?.data?.Footer || null,
            universalText: resUniversalText?.data?.UniversalText || null,
            Page: resPage?.data?.allPage?.edges?.[0]?.node || null,
        },
    };
};
exports.getStaticProps = getStaticProps;
const getStaticPaths = async () => {
    const client = client_1.publishedClient;
    const allSlugs = [];
    const allPagePrmoises = [];
    const allNavPromises = [];
    ["en"]?.map((locale) => {
        allPagePrmoises.push(client.query({
            query: q_slugs_1.q_slugs,
            variables: { locale },
            fetchPolicy: "no-cache",
        }));
        allNavPromises.push(client.query({
            query: q_mega_menu_1.q_mega_menu,
            variables: { locale },
            fetchPolicy: "no-cache",
        }));
    });
    const homePageSlugs = (await Promise.all(allNavPromises))?.map((navRes) => navRes?.data?.MainNavigation?.home?.[0]?.slug);
    const results = await Promise.all(allPagePrmoises);
    results.map((resSlugs) => {
        const slugs = [];
        resSlugs?.data?.allPage?.edges?.map((e) => e?.node?.slug && slugs.push(e?.node?.slug));
        slugs.map((s) => {
            if (!allSlugs.includes(s) && !homePageSlugs.includes(s)) {
                allSlugs.push(s);
            }
        });
    });
    const uniqueCaseInsensitive = (value, index, self) => self.findIndex((item) => value.toLowerCase() === item.toLowerCase()) ===
        index;
    const paths = allSlugs
        .filter(uniqueCaseInsensitive)
        .map((s) => ({ params: { slug: s } }));
    return {
        fallback: true,
        paths,
    };
};
exports.getStaticPaths = getStaticPaths;
exports.default = NextjsPage;
