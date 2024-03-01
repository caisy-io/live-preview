"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const router_1 = require("next/router");
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const CloseLeft_1 = require("../../../constants/svgs/CloseLeft");
const CloseRight_1 = require("../../../constants/svgs/CloseRight");
const Rectangle_1 = require("../../../constants/svgs/Rectangle");
const desiredLanguagesOrder_1 = require("../../../utils/helpers/desiredLanguagesOrder");
const SPageHeader_1 = require("./styles/SPageHeader");
const SPageHeaderApp_1 = require("./styles/SPageHeaderApp");
const SPageHeaderClose_1 = require("./styles/SPageHeaderClose");
const SPageHeaderLinks_1 = require("./styles/SPageHeaderLinks");
const SPageHeaderLinksContainer_1 = require("./styles/SPageHeaderLinksContainer");
const SPageHeaderLocal_1 = require("./styles/SPageHeaderLocal");
const SPageHeaderLocals_1 = require("./styles/SPageHeaderLocals");
const SPageHeaderLogo_1 = require("./styles/SPageHeaderLogo");
const SPageHeaderLogoContainer_1 = require("./styles/SPageHeaderLogoContainer");
const SPageHeaderWrapper_1 = require("./styles/SPageHeaderWrapper");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const getInspectProps_1 = require("@repo/live-preview-react/getInspectProps");
const PageHeaderLogo_1 = require("./PageHeaderLogo");
const PageHeaderNavLink_1 = require("./PageHeaderNavLink");
const PageHeader = ({ navigation: navigationOrg, setIsOpen, homePageSlug, firstCompoentHeight, isOpen, }) => {
    const { locales, asPath, locale } = (0, router_1.useRouter)();
    const [whiteMode, setWhiteMode] = (0, react_1.useState)(false);
    const navigation = (0, useCaisyUpdates_1.useCaisyUpdates)({
        ...navigationOrg,
    });
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            setWhiteMode(false);
        }
        else {
            if ((document.documentElement.scrollTop + 100) / window.innerHeight >
                (window.innerWidth > 768
                    ? firstCompoentHeight?.silver
                    : firstCompoentHeight?.bronze)) {
                setWhiteMode(true);
            }
            else {
                setWhiteMode(false);
            }
        }
    }, [isOpen]);
    (0, react_1.useEffect)(() => {
        const runOnScroll = () => {
            if ((document.documentElement.scrollTop + 100) / window.innerHeight >
                (window.innerWidth > 768
                    ? firstCompoentHeight?.silver
                    : firstCompoentHeight?.bronze)) {
                setWhiteMode(true);
            }
            else {
                setWhiteMode(false);
            }
        };
        window.addEventListener("scroll", runOnScroll, {
            passive: true,
        });
        return () => {
            window.removeEventListener("scroll", runOnScroll);
        };
    }, [whiteMode, setWhiteMode, asPath, locale]);
    return ((0, jsx_runtime_1.jsxs)(SPageHeader_1.SPageHeader, { whiteMode: whiteMode, children: [(0, jsx_runtime_1.jsx)(SPageHeaderLogo_1.SPageHeaderLogo, { whiteMode: whiteMode, ...(0, getInspectProps_1.getInspectProps)({
                    id: navigation.id,
                    fieldName: "logo",
                }), children: (0, jsx_runtime_1.jsx)(PageHeaderLogo_1.PageHeaderLogo, { logo: navigation?.logo, logoDark: navigation?.logoDarkVersion }) }), (0, jsx_runtime_1.jsxs)(SPageHeaderLinks_1.SPageHeaderLinks, { whiteMode: whiteMode, children: [(0, jsx_runtime_1.jsxs)(SPageHeaderWrapper_1.SPageHeaderWrapper, { children: [(0, jsx_runtime_1.jsx)(SPageHeaderLogoContainer_1.SPageHeaderLogoContainer, { onClick: () => {
                                    setIsOpen(!isOpen);
                                }, children: isOpen ? ((0, jsx_runtime_1.jsxs)(SPageHeaderClose_1.SPageHeaderClose, { children: [(0, jsx_runtime_1.jsx)(CloseLeft_1.CloseLeft, {}), (0, jsx_runtime_1.jsx)(CloseRight_1.CloseRight, {})] })) : ((0, jsx_runtime_1.jsxs)(SPageHeaderApp_1.SPageHeaderApp, { children: [(0, jsx_runtime_1.jsx)(Rectangle_1.Rectangle, {}), (0, jsx_runtime_1.jsx)(Rectangle_1.Rectangle, {})] })) }), (0, jsx_runtime_1.jsx)(SPageHeaderLocals_1.SPageHeaderLocals, { isOpen: isOpen, children: (0, desiredLanguagesOrder_1.desiredLanguagesOrder)(locales).map((l) => ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(link_1.default, { href: asPath, locale: l, passHref: true, legacyBehavior: true, children: (0, jsx_runtime_1.jsx)(SPageHeaderLocal_1.SPageHeaderLocal, { whiteMode: whiteMode, active: l === locale, children: l }) }) }, `locale-${l}`))) })] }), (0, jsx_runtime_1.jsxs)(SPageHeaderLinksContainer_1.SPageHeaderLinksContainer, { whiteMode: whiteMode, ...(0, getInspectProps_1.getInspectProps)({
                            id: navigation.id,
                            fieldName: "mainNavigation",
                        }), children: [navigation?.mainNavigation?.map((link) => ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(PageHeaderNavLink_1.PageHeaderNavLink, { whiteMode: whiteMode, homePageSlug: homePageSlug, ...link }) }, link.id))), (0, jsx_runtime_1.jsx)(SPageHeaderLocals_1.SPageHeaderLocals, { isOpen: true, children: (0, desiredLanguagesOrder_1.desiredLanguagesOrder)(locales).map((l) => ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(link_1.default, { href: asPath, locale: l, passHref: true, legacyBehavior: true, children: (0, jsx_runtime_1.jsx)(SPageHeaderLocal_1.SPageHeaderLocal, { whiteMode: whiteMode, active: l === locale, children: l }) }) }, `locale-${l}`))) })] })] })] }));
};
exports.PageHeader = PageHeader;
