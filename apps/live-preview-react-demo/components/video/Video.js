"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SVideo_1 = require("./styles/SVideo");
const react_1 = require("react");
const Video = ({ vimeoVideoId, inline, ...props }) => {
    const [mounted, setMounted] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setMounted(true);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(SVideo_1.SVideo, { inline: inline, children: [props.children, (0, jsx_runtime_1.jsx)("div", { style: {
                    transitionStyle: "opacity",
                    transitionTimingFunction: "ease",
                    transitionDuration: "0.3s",
                    transitionDelay: "0.8s",
                    opacity: mounted ? 1 : 0,
                }, children: (0, jsx_runtime_1.jsx)("iframe", { src: `https://player.vimeo.com/video/${vimeoVideoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&sidedock=0&controls=0&portrait=0`, loading: "lazy", frameBorder: "0", allow: "autoplay; picture-in-picture", allowFullScreen: false }) })] }));
};
exports.Video = Video;
