import { createElement } from "../helpers/createElement";
import createCaisyLivePreviewElement from "./createCaisyLivePreviewElement";

type ICreateCaisyLivePreviewElementWrapper = ({
  children,
}: {
  children?: HTMLElement | HTMLElement[];
}) => HTMLElement;

const createCaisyLivePreviewElementWrapper: ICreateCaisyLivePreviewElementWrapper =
  ({ children }) => {
    const childrenContainer = createElement({
      tagName: "div",
      children,
    });
    const caisyLivePreviewElement = createCaisyLivePreviewElement();

    const previewElementContainer = createElement({
      tagName: "div",
      className: "caisy-live-preview-element-wrapper",
      children: caisyLivePreviewElement,
    });

    const wrapper = createElement({
      tagName: "div",
      children: [previewElementContainer, childrenContainer],
    });

    return wrapper;
  };

export default createCaisyLivePreviewElementWrapper;
