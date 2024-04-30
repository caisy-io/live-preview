export default defineEventHandler((event) => {
  //   console.log(` req.headers.refferer`, event.headers.referer);
  if (event.node.req.method !== "GET") {
    throw createError({
      statusCode: 400,
      statusMessage: "Wrong request method",
    });
    // return event.node.res.status(400).send("Wrong request method");
  }

  const query = getQuery(event);

  if (query.secret !== process.env.DRAFT_MODE_SECRET && false) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
    // return res.status(401).send("Unauthorized");
  }

  const { slug, caisy_preview_access_token } = query;

  if (caisy_preview_access_token) {
    setCookie(
      event,
      "caisy_preview_access_token",
      caisy_preview_access_token as string
    );
    // res.setHeader(
    //   "Set-Cookie",
    //   `caisy_preview_access_token=${caisy_preview_access_token}; Path=/;`
    // );
  }

  //   if (process.env.USE_DRAFT_MODE == "true") {
  //     //@ts-ignore
  //     res.setDraftMode({ enable: true });
  //   }
  //   console.log("Draft mode enabled successfully");

  sendRedirect(event, slug ? `/${slug}` : `/`);
});
