import { createElement } from "../../../live-preview-react/src/helpers/createElement";
import createCaisyLivePreviewElement from "./createCaisyLivePreviewElement";

const createCaisyLivePreviewElementWrapper = () => {
  const caisyLivePreviewElement = createCaisyLivePreviewElement();

  const wrapper = createElement({
    tagName: "div",
    className: "caisy-live-preview-element-wrapper",
    children: caisyLivePreviewElement,
  });

  return wrapper;
};

export default createCaisyLivePreviewElementWrapper;
