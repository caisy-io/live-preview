export { default } from "./[slug]";
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
        Page: import("../utils/types_gen").IGenPage | null;
    };
    redirect?: undefined;
}>;
//# sourceMappingURL=index.d.ts.map