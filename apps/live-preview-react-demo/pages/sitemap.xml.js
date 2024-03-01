"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideProps = void 0;
const client_1 = require("../utils/gql/client");
const q_slugs_1 = require("../utils/gql/queries/q_slugs");
const _slug_1 = require("./[slug]");
const Sitemap = () => {
    return null;
};
const getServerSideProps = async ({ res, req, locales, }) => {
    const client = client_1.publishedClient;
    const _qres = client.query({
        query: q_slugs_1.q_slugs,
        variables: { locale: "en" },
        fetchPolicy: "no-cache",
    });
    const { paths } = await (0, _slug_1.getStaticPaths)();
    const allPagesSlugs = (await _qres)?.data?.allPage?.edges;
    const baseUrl = `https://${req.headers["host"] || req.headers["x-forwarded-host"]}`;
    const allSlugs = [
        "",
        ...paths.map((slug) => slug?.params?.slug).filter((s) => !!s),
    ];
    const slugToPrio = (slug) => {
        if (slug == "") {
            return "1";
        }
        const xfound = allPagesSlugs?.find((e) => e?.node?.slug === slug);
        if (xfound && xfound.node.sitemapPriority) {
            const n = parseInt(xfound.node.sitemapPriority.toString().replace(`Priority`, ""));
            if (!isNaN(n)) {
                return "" + n / 100;
            }
        }
        return "0.6";
    };
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
        ${allSlugs
        .sort((a, b) => {
        const numberA = parseFloat(slugToPrio(a));
        const numberB = parseFloat(slugToPrio(b));
        return numberA > numberB ? -1 : 1;
    })
        .map((slug) => {
        return `
            <url>
              <loc>${baseUrl}/${slug}</loc>
              ${(locales ? locales : [])
            .map((loc) => `
                <xhtml:link
               rel="alternate"
               hreflang="${loc}"
               href="${baseUrl}/${loc}/${slug}"/>
              `)
            .join("")}
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>${slugToPrio(slug)}</priority>
            </url>
          `;
    })
        .join("")}
    </urlset>
  `;
    res.setHeader("Content-Type", "text/xml");
    res.setHeader("Cache-Control", `max-age=${60 * 60 * 1}`); // 1 hour cache
    res.write(sitemap);
    res.end();
    return {
        props: {},
    };
};
exports.getServerSideProps = getServerSideProps;
exports.default = Sitemap;
