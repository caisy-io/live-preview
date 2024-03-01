"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mediaquerys_1 = require("../constants/styles/mediaquerys");
function useImageMedia() {
    const [media, setMedia] = react_1.default.useState(mediaquerys_1.BREAKPOINTS.PLATINUM);
    react_1.default.useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            if (window.innerWidth >= mediaquerys_1.BREAKPOINTS.PLATINUM)
                setMedia(mediaquerys_1.BREAKPOINTS.DIAMOND);
            else if (window.innerWidth >= mediaquerys_1.BREAKPOINTS.GOLD)
                setMedia(mediaquerys_1.BREAKPOINTS.PLATINUM);
            else if (window.innerWidth >= mediaquerys_1.BREAKPOINTS.SILVER)
                setMedia(mediaquerys_1.BREAKPOINTS.GOLD);
            else
                setMedia(mediaquerys_1.BREAKPOINTS.SILVER);
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return media;
}
exports.default = useImageMedia;
