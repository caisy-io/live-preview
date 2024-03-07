import { createElement } from "../helpers/createElement";

const createCaisyLivePreviewElement = () => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
      <path
        d="M168.29 195.46c20.44 25.61 40.2-4.87 8.92-19.3l9.87-.62s27.85 22.22 12.53 36.74c-15.32 14.53-32.54-12.76-32.54-12.76l1.21-4.05z"
        strokeWidth="0px"
        fill="rgba(255,255,255,0.55"
      ></path>
      <path
        d="M168.81 237.95c-.3.07-.62.18-.96.27 2.55-1.19 4.28-2.65 5.4-4.21 6.24-8.67-7.24-16.74-13.92-10.14 3.51-6.17-.73-10.55-6.52-11.1 27.81 1.23 33.84 19.67 16.01 25.18z"
        strokeWidth="0px"
        fill="rgba(255,255,255,0.2)"
      ></path>
      <path
        d="M160.33 217.8s-.01-.03-.02-.04c0 .01.01.03.02.04zM160.03 217.04s-.04-.09-.06-.13c.02.04.04.09.06.13zM159.04 215.57l-.14-.14.14.14zM160.54 218.7v-.04.04zM160.6 219.54v0zM160.26 221.72s.03-.08.04-.12c-.01.04-.03.08-.04.12zM159.87 222.77s.03-.08.05-.11c-.02.04-.03.08-.05.11zM156.6 213.8c.1.05.2.1.29.15-.1-.05-.19-.1-.29-.15zM167.84 238.22c2.55-1.19 4.28-2.65 5.4-4.21 6.24-8.67-7.24-16.74-13.92-10.15-1.57 2.76-4.7 5.89-9.94 9.19-3.72 2.34-1.73 8.15 2.65 7.74 5.16-.48 9.97-1.24 14.42-2.23.29-.06.58-.14.86-.2.18-.05.36-.09.53-.15.08-.02.14-.05.22-.07-.08.02-.15.04-.22.06zM158.27 214.85c.06.05.11.1.17.15-.06-.05-.11-.1-.17-.15zM169.4 237.75c.1-.03.2-.07.29-.1-.1.03-.19.07-.29.1zM153.73 212.9l.33.06-.33-.06zM157.44 214.26c.06.04.12.07.17.11-.06-.04-.12-.07-.17-.11zM155.78 213.45c.09.03.18.07.27.11a3.06 3.06 0 00-.27-.11zM154.66 213.1c.11.03.22.05.32.08-.11-.03-.22-.06-.32-.08z"
        strokeWidth="0px"
        fill="rgba(255,255,255,0.55"
      ></path>
      <path
        d="M167.73 238.26c15.83-4.58 14.41-24.19-15.28-25.5-9.12-.64-22.77 1.47-30.93-11.28-7.48-11.7-4.77-27.28 2.35-35.89 4.33-5.27 10.31-7.93 16.61-5.48 4.03 1.57 8.19 5.24 12.11 11.67 16.64 27.28 31.39 47.46 43.9 37.95 11.35-8.62.88-27.7-19.89-33.76-4.72-1.38-4.65-8.14.17-9.22 44.46-9.99 55.09 56.19-9.03 71.51zM373.18 160.66c0 4.17-2.66 7.78-7.69 7.78s-7.78-3.61-7.78-7.78c0-3.8 2.56-7.5 7.78-7.5s7.69 3.7 7.69 7.5zM276.84 209.43c-2.81 4.35-7.35 7.54-13.63 7.54-4.63 0-8.5-1.54-11.6-4.73-3.1-3.19-4.65-7.06-4.65-11.71s1.56-8.5 4.65-11.69c3.1-3.19 6.96-4.73 11.6-4.73 6.29 0 11.02 3.48 14.02 8.02l10.44-6.77c-4.73-7.35-13.44-12.87-24.65-12.87-16.63 0-28.81 12-28.81 27.94s12.46 28.13 28.81 28.13c9.67 0 19.63-4.15 25.13-13.44l-11.31-5.69zM346.92 174.05c-2.12 0-4.15.62-5.87 1.73-1.71 1.12-3.1 2.69-3.98 4.63-4.35-5.4-11.5-7.92-18.56-7.92-15.08 0-26.77 12.29-26.77 28.13s11.5 28.04 26.48 28.04c8.12 0 15.65-3.67 19.44-9.37v8.12h11.79v-53.36h-2.54zm-14.77 38.19c-3 3.19-6.87 4.73-11.4 4.73s-8.52-1.54-11.62-4.73c-3.08-3.19-4.63-7.06-4.63-11.81s1.56-8.5 4.63-11.6c3.1-3.19 6.96-4.73 11.62-4.73s8.4 1.54 11.4 4.73c3 3.1 4.54 6.96 4.54 11.6s-1.54 8.62-4.54 11.81zM359.09 174.05v53.36h12.58v-53.36h-12.58zM419.99 199.85c-3.58-2.4-8.88-4.25-16.13-5.5-10.73-1.85-11.02-4.56-11.02-6.1 0-2.62 3.77-4.15 8.4-4.15s10.63 1.73 14.21 5.31l8.21-8.21c-4.25-4.63-11.88-8.71-21.94-8.71-11.12 0-21.65 5.23-21.65 15.38 0 9.37 6.87 15.27 22.23 17.98 4.37.77 7.25 1.54 8.52 2.23 1.35.67 2.02 1.63 2.02 3.08 0 3-3.48 5.81-9.17 5.81-7.73 0-12.77-2.62-17.31-7.15l-8.5 7.92c2.12 2.81 5.21 5.33 9.37 7.54 4.15 2.23 9.48 3.29 15.96 3.29 12.65 0 22.23-7.25 22.23-17.4 0-5.12-1.85-8.88-5.42-11.31zM470.36 174.05v29.77c0 6.77-6.87 12-13.62 12-7.65 0-12.38-4.85-12.38-12.29v-29.48h-12.58v34.23c0 10.13 9.87 19.13 23.12 19.13 5.81 0 11.79-2.52 15.96-7.15v1.35c0 8.04-6.29 13.63-15.48 13.63-3.31 0-7.1-.6-10.69-1.83l-3.79 10.94c4.62 1.58 9.71 2.48 14.67 2.48 15.58 0 27.37-10.92 27.37-24.85v-47.94h-12.58z"
        strokeWidth="0px"
        fill="#ffffff"
      ></path>
    </svg>
  `;

  const inner = createElement({
    tagName: "svg",
    content: svg,
  });

  const wrapper = createElement({
    tagName: "div",
    className: "caisy-live-preview-element",
    children: inner,
  });

  return wrapper;
};

export default createCaisyLivePreviewElement;
