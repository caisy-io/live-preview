export { default } from "./[slug]";
import { getStaticProps as getStaticPropsSlug } from "./[slug]";

export const getStaticProps = async ({ params, locale = "en", draftMode }) => {
  return getStaticPropsSlug({
    params: {
      ...params,
      isIndexPage: true,
    },
    draftMode,
    locale,
  });
};
