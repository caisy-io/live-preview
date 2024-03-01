"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const SFooter_1 = require("./styles/SFooter");
const SFooterLogo_1 = require("./styles/SFooterLogo");
const SFooterMainNavigation_1 = require("./styles/SFooterMainNavigation");
const SFooterSectionLocales_1 = require("./styles/SFooterSectionLocales");
const SFooterSectionLocale_1 = require("./styles/SFooterSectionLocale");
const SFooterLegalSection_1 = require("./styles/SFooterLegalSection");
const SFooterCopyright_1 = require("./styles/SFooterCopyright");
const SFooterLeftSection_1 = require("./styles/SFooterLeftSection");
const SFooterRightSection_1 = require("./styles/SFooterRightSection");
const SFooterSections_1 = require("./styles/SFooterSections");
const SFooterLegalAndCopyright_1 = require("./styles/SFooterLegalAndCopyright");
const SGridPadding_1 = require("../../base-components/grid-padding/styles/SGridPadding");
const SFlex_1 = require("../../base-components/flex/styles/SFlex");
const desiredLanguagesOrder_1 = require("../../utils/helpers/desiredLanguagesOrder");
const universalText_1 = require("../../provider/universalText");
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const getInspectProps_1 = require("@repo/live-preview-react/getInspectProps");
const FooterLegalLink_1 = require("./FooterLegalLink");
const FooterNavLink_1 = require("./FooterNavLink");
const Footer = (props) => {
    const { locales, asPath, locale } = (0, router_1.useRouter)();
    const { is404, homePageSlug, navigation, footer } = props;
    const { home, logo, mainNavigation } = (0, useCaisyUpdates_1.useCaisyUpdates)(navigation);
    const { legalSection } = (0, useCaisyUpdates_1.useCaisyUpdates)(footer);
    const universalText = (0, universalText_1.useUniversalText)();
    return ((0, jsx_runtime_1.jsx)(SFooter_1.SFooter, { is404: is404, children: (0, jsx_runtime_1.jsx)(SGridPadding_1.SGridPadding, { children: (0, jsx_runtime_1.jsxs)(SFlex_1.SFlex, { bronze: { direction: "column" }, silver: { direction: "row" }, children: [(0, jsx_runtime_1.jsxs)(SFooterLeftSection_1.SFooterLeftSection, { children: [(0, jsx_runtime_1.jsx)(SFooterLogo_1.SFooterLogo, { children: home?.[0]?.__typename === "Page" && logo?.src && ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/`, legacyBehavior: true, children: (0, jsx_runtime_1.jsx)("a", { children: (0, jsx_runtime_1.jsx)("img", { src: logo.src, alt: logo.title }) }) })) }), (0, jsx_runtime_1.jsx)(SFooterCopyright_1.SFooterCopyright, { children: `© ${new Date().getFullYear()} ${universalText?.copyright}` })] }), (0, jsx_runtime_1.jsxs)(SFooterRightSection_1.SFooterRightSection, { children: [(0, jsx_runtime_1.jsx)(SFooterSections_1.SFooterSections, { children: mainNavigation && ((0, jsx_runtime_1.jsx)(SFooterMainNavigation_1.SFooterMainNavigation, { ...(0, getInspectProps_1.getInspectProps)({
                                        id: navigation.id,
                                        fieldName: "mainNavigation",
                                    }), children: mainNavigation.map((el) => ((0, jsx_runtime_1.jsx)(FooterNavLink_1.FooterNavLink, { homePageSlug: homePageSlug, ...el }, el.id))) })) }), (0, jsx_runtime_1.jsxs)(SFooterLegalAndCopyright_1.SFooterLegalAndCopyright, { children: [(0, jsx_runtime_1.jsx)(SFooterSectionLocales_1.SFooterSectionLocales, { children: (0, desiredLanguagesOrder_1.desiredLanguagesOrder)(locales).map((l) => ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(link_1.default, { legacyBehavior: true, href: asPath, locale: l, passHref: true, children: (0, jsx_runtime_1.jsx)(SFooterSectionLocale_1.SFooterSectionLocale, { active: l === locale, children: l }) }) }, `locale-${l}`))) }), (0, jsx_runtime_1.jsx)(SFooterLegalSection_1.SFooterLegalSection, { ...(0, getInspectProps_1.getInspectProps)({
                                            id: footer.id,
                                            fieldName: "legalSection",
                                        }), children: legalSection &&
                                            legalSection.map((el) => {
                                                return ((0, jsx_runtime_1.jsx)(FooterLegalLink_1.FooterLegalLink, { homePageSlug: homePageSlug, ...el }, el.id));
                                            }) })] }), (0, jsx_runtime_1.jsx)(SFooterCopyright_1.SFooterCopyright, { children: `© ${new Date().getFullYear()} ${universalText?.copyright}` })] })] }) }) }));
};
exports.Footer = Footer;
