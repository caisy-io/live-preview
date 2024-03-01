"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler = async (req, res) => {
    console.log(` req.headers.refferer`, req.headers.referer);
    if (req.method !== "GET") {
        return res.status(400).send("Wrong request method");
    }
    if (req.query.secret !== process.env.DRAFT_MODE_SECRET) {
        return res.status(401).send("Unauthorized");
    }
    const { slug, caisy_preview_access_token } = req.query;
    if (caisy_preview_access_token) {
        res.setHeader("Set-Cookie", `caisy_preview_access_token=${caisy_preview_access_token}; Path=/;`);
    }
    if (process.env.USE_DRAFT_MODE == "true") {
        //@ts-ignore
        res.setDraftMode({ enable: true });
    }
    console.log("Draft mode enabled successfully");
    res.redirect(slug ? `/${slug}` : `/`);
};
exports.default = handler;
