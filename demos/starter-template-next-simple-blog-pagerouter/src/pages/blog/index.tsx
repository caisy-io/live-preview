export { default } from "./[slug]";
import { getStaticProps as getStaticPropsSlug } from "./[slug]";

export const getStaticProps = async ({ params, draftMode }) => {
  return getStaticPropsSlug({
    params: {
      ...params,
    },
    draftMode,
  });
};
