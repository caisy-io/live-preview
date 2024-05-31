import {
  defineEventHandler,
  getQuery,
  setResponseStatus,
  sendRedirect,
} from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { secret, slug, caisy_preview_access_token } = query;
  // const config = useRuntimeConfig(event);

  if (event.node.req.method !== "GET") {
    setResponseStatus(event, 400);
    return "Wrong request method";
  }

  // Check if the secret is correct, this is purely for security
  if (secret !== "mySecret") {
    setResponseStatus(event, 401);
    return "Unauthorized";
  }

  // Redirect to the correct page with the slug we set on the Preview URL
  const redirectTo = slug
    ? `/${slug}?caisy_preview_access_token=${caisy_preview_access_token}`
    : `/?caisy_preview_access_token=${caisy_preview_access_token}`;

  sendRedirect(event, redirectTo);
});
