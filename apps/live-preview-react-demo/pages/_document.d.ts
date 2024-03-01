/// <reference types="react" />
import Document, { DocumentContext } from "next/document";
export default class MyDocument extends Document {
    static getInitialProps(ctx: DocumentContext): Promise<{
        styles: import("react/jsx-runtime").JSX.Element;
        html: string;
        head?: (JSX.Element | null)[] | undefined;
    }>;
    render(): import("react/jsx-runtime").JSX.Element;
}
//# sourceMappingURL=_document.d.ts.map