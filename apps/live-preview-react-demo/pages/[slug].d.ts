import { IPage } from "../utils/types";
import { IGenPage } from "../utils/types_gen";
type ISlugPage = Pick<IPage, "navigation" | "footer" | "Page"> & {
    isIndexPage: boolean | null;
};
declare const NextjsPage: (props: ISlugPage) => import("react/jsx-runtime").JSX.Element;
export declare const getStaticProps: ({ params, locale, draftMode }: {
    params: any;
    locale?: string | undefined;
    draftMode: any;
}) => Promise<{
    revalidate: number;
    props: {
        draftMode?: undefined;
        isIndexPage?: undefined;
        navigation?: undefined;
        footer?: undefined;
        universalText?: undefined;
        Page?: undefined;
    };
    redirect?: undefined;
} | {
    redirect: {
        destination: string;
    };
    revalidate?: undefined;
    props?: undefined;
} | {
    revalidate: number;
    props: {
        draftMode: boolean;
        isIndexPage: any;
        navigation: import("../utils/types_gen").IGenMainNavigation | null;
        footer: import("../utils/types_gen").IGenFooter | null;
        universalText: import("../utils/types_gen").IGenUniversalText | null;
        Page: IGenPage | null;
    };
    redirect?: undefined;
}>;
export declare const getStaticPaths: () => Promise<{
    fallback: boolean;
    paths: {
        params: {
            slug: any;
        };
    }[];
}>;
export default NextjsPage;
//# sourceMappingURL=%5Bslug%5D.d.ts.map