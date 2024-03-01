// 008CFF

import { PEER_MESSAGE_TYPE_PREVIEW_FIELD_ACTIVE } from "../collaboration/constants";
import { encodeAnyJSONMessage } from "../collaboration/encoding";
import {
  broadcastToAllPeers,
  clientIsPreviewRole,
} from "../collaboration/helper";
import {
  ATTRIBUTE_NAME_LOCALE_NAME,
  ATTRIBUTE_NAME_DOCUMENT_ID,
  ATTRIBUTE_NAME_FIELD_NAME,
} from "../constants";

import {
  ACTIVE_LOCALE_NAME_ATTRIBUTE,
  ACTIVE_DOCUMENT_ID_ATTRIBUTE,
  ACTIVE_FIELD_NAME_ATTRIBUTE,
  INTERACTIVE_ELEMENT_CLASS,
  INTERACTIVE_ELEMENT_HEIGHT,
  INTERACTIVE_ELEMENT_PADDING_LEFT,
  INTERACTIVE_ELEMENT_ID,
} from "./constants";

const createInteractiveElement = () => {
  let interactiveElement = document.getElementById(INTERACTIVE_ELEMENT_ID);
  if (!interactiveElement) {
    interactiveElement = document.createElement("button");
    interactiveElement.id = INTERACTIVE_ELEMENT_ID;
    interactiveElement.classList.add(INTERACTIVE_ELEMENT_CLASS);
    interactiveElement.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path style="stroke: currentColor" d="M2.251 11.102l8.851-8.851a.857.857 0 011.211 0l1.437 1.436a.857.857 0 010 1.212l-8.852 8.85a.853.853 0 01-.605.251H2v-2.293c0-.227.09-.445.251-.605zM9.283 4.451l2.265 2.265"></path></svg>Edit`;
    document.body.insertAdjacentElement("beforeend", interactiveElement);
  }
  return interactiveElement;
};

export const startInspectMode = ({
  locale,
  projectId,
}: {
  locale: string;
  projectId: string;
}) => {
  const defaultLocale = locale;
  const interactiveElement = createInteractiveElement();
  let positioningElement: HTMLElement;

  const updateElementPosition = () => {
    if (!positioningElement || !interactiveElement) return false;

    const currentRectOfElement = positioningElement.getBoundingClientRect();
    const currentRectOfParentOfElement =
      interactiveElement.parentElement?.getBoundingClientRect();

    if (currentRectOfElement && currentRectOfParentOfElement) {
      let upperBoundOfTooltip =
        currentRectOfElement.top - INTERACTIVE_ELEMENT_HEIGHT;
      const left = currentRectOfElement.left - INTERACTIVE_ELEMENT_PADDING_LEFT;

      if (upperBoundOfTooltip < 0) {
        if (currentRectOfElement.top < 0)
          upperBoundOfTooltip = currentRectOfElement.top;
        else upperBoundOfTooltip = 0;
      }

      interactiveElement.style.top = upperBoundOfTooltip + "px";
      interactiveElement.style.left = left + "px";
      return true;
    }
    return false;
  };

  const addInteractiveElementOnHover = (e) => {
    const eventTargets = e.composedPath();

    for (const eventTarget of eventTargets) {
      const element = eventTarget as HTMLElement;
      if (element.nodeName === "BODY") break;
      if (typeof element?.getAttribute !== "function") continue;

      const documentId = element.getAttribute(ATTRIBUTE_NAME_DOCUMENT_ID);
      const fieldName = element.getAttribute(ATTRIBUTE_NAME_FIELD_NAME);
      const localeApiName =
        element.getAttribute(ATTRIBUTE_NAME_LOCALE_NAME) ?? defaultLocale;

      if (fieldName && documentId && localeApiName) {
        positioningElement = element;

        if (updateElementPosition()) {
          interactiveElement?.setAttribute(
            ACTIVE_FIELD_NAME_ATTRIBUTE,
            fieldName
          );
          interactiveElement?.setAttribute(
            ACTIVE_DOCUMENT_ID_ATTRIBUTE,
            documentId
          );
          interactiveElement?.setAttribute(
            ACTIVE_LOCALE_NAME_ATTRIBUTE,
            localeApiName
          );
        }
        break;
      }
    }
  };

  const clickHandler = () => {
    const activeDocumentId = interactiveElement?.getAttribute(
      ACTIVE_DOCUMENT_ID_ATTRIBUTE
    );
    const activeFieldName = interactiveElement?.getAttribute(
      ACTIVE_FIELD_NAME_ATTRIBUTE
    );
    const activeLocale =
      interactiveElement?.getAttribute(ACTIVE_LOCALE_NAME_ATTRIBUTE) ||
      defaultLocale;

    if (activeFieldName && activeDocumentId && activeLocale) {
      // console.log(activeDocumentId, activeFieldName, activeLocale);

      const sameUserEditorPeers = window.c.collaboration?.peers.filter(
        (p) =>
          p.clientId !== window.c.collaboration?.ownClientId &&
          !clientIsPreviewRole(p.clientId) && // exclude preview role
          p.clientId.slice(0, 38) ==
            window.c.collaboration?.ownClientId?.slice(0, 38) // only same user id get the updates
      );

      // console.log(` sameUserEditorPeers`, sameUserEditorPeers);
      broadcastToAllPeers(
        sameUserEditorPeers || [],
        encodeAnyJSONMessage({
          messageType: PEER_MESSAGE_TYPE_PREVIEW_FIELD_ACTIVE,
          body: {
            documentId: activeDocumentId,
            fieldName: activeFieldName,
            locale: activeLocale,
            projectId,
          },
        })
      );

      // window.c.preview.pubsub.emit("edit", [
      //   {
      //     documentId: activeDocumentId,
      //     fieldName: activeFieldName,
      //     locale: activeLocale,
      //   },
      // ]);
    }
  };

  interactiveElement.addEventListener("click", clickHandler);
  window.addEventListener("scroll", updateElementPosition);
  window.addEventListener("resize", updateElementPosition);
  window.addEventListener("mouseover", addInteractiveElementOnHover);

  return () => {
    interactiveElement.removeEventListener("click", clickHandler);
    window.removeEventListener("scroll", updateElementPosition);
    window.removeEventListener("resize", updateElementPosition);
    window.removeEventListener("mouseover", addInteractiveElementOnHover);
    interactiveElement?.remove();
  };
};
