import { useDraggableElement } from "./useDraggableElement";
import { iconCaisy, iconDragHandler } from "./icons";
import { createElement } from "../helpers/createElement";

const DESCRIPTION_BY_STATE = {
  Disconnected:
    "Your connection has timed out, to continue restart the preview in <strong>caisy</strong>",
  Reconnecting:
    "Connected to the preview server, but there is no active caisy window to connect to",
};

type IConnectionState = "Connected" | "Reconnecting" | "Disconnected";

const WIDTH_BY_STATE = {
  Connected: 221,
  Reconnecting: 293,
  Disconnected: 293,
};

const HEIGHT_BY_STATE = {
  Connected: 48,
  Reconnecting: 112,
  Disconnected: 112,
};

export const createConnectionIndicator = () => {
  let state = "Connected";
  let description = DESCRIPTION_BY_STATE[state];

  const dragHandler = createElement({
    tagName: "div",
    className: "caisy-connection-indicator-icon-drag",
    content: iconDragHandler,
  });

  const content = createElement({
    tagName: "div",
    className: `caisy-connection-indicator-content --${state.toLowerCase()}`,
    content: `${iconCaisy} Live Preview ${state}`,
  });

  const indicatorHeader = createElement({
    tagName: "div",
    className: "caisy-connection-indicator-header",
    children: [dragHandler, content],
  });

  const indicator = createElement({
    tagName: "div",
    className: "caisy-connection-indicator",
    children: [indicatorHeader],
  });

  const indicatorContainer = createElement({
    tagName: "div",
    className: "caisy-connection-indicator-container",
    children: indicator,
  });

  useDraggableElement(indicator, dragHandler);

  const observer = new MutationObserver((e) => {
    state = document.body.dataset["collaboration"] as IConnectionState;
    console.log({ state });
    if (!state) return;
    description = DESCRIPTION_BY_STATE[state];

    const descriptionElement = createElement({
      tagName: "div",
      className: "caisy-connection-indicator-description",
      content: description,
    });

    content?.classList.remove(
      "--connected",
      "--reconnecting",
      "--disconnected"
    );

    content?.classList.add(`--${state.toLowerCase()}`);

    const contentElement = document.querySelector(
      ".caisy-connection-indicator-content"
    );

    contentElement.innerHTML = `${iconCaisy} Live Preview ${state}`;

    if (description) {
      indicator.appendChild(descriptionElement);
    } else {
      const descriptionElement = document.querySelector(
        ".caisy-connection-indicator-description"
      );
      descriptionElement?.remove();
    }

    const oldHeight = indicator.getBoundingClientRect().height;
    const newHeight = HEIGHT_BY_STATE[state];

    indicator.style.width = `${WIDTH_BY_STATE[state]}px`;
    indicator.style.height = `${HEIGHT_BY_STATE[state]}px`;

    indicator.style.top = `${indicator.offsetTop - (newHeight - oldHeight)}px`;
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-collaboration"],
  });

  return { connectionIndicator: indicatorContainer, observer };
};
