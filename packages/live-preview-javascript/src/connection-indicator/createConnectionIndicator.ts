import { useDraggableElement } from "./useDraggableElement";
import { createElement } from "../../../live-preview-react/src/helpers/createElement";
import { iconCaisy, iconDragHandler } from "./icons";

const DESCRIPTION_BY_STATE = {
  Disconnected: 'Your connection has timed out, to continue restart the preview in <strong>caisy</strong>',
  Reconnecting: 'Connected to the preview server, but there is no active caisy window to connect to'
  // Disconnected: (
  //   <p>
  //     You connection has timed, out, to continue restart the preivew in{" "}
  //     <strong>caisy</strong>
  //   </p>
  // ),
  // Reconnecting: (
  //   <p>
  //     Connected to the preview server, but there is no active caisy window to
  //     connect to
  //   </p>
  // ),
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

// export const ConnectionIndicator: FC = () => {
//   const [initialized, setInitialized] = useState(false);
//   const [state, setState] = useState<IConnectionState>("Connected");

//   const description = DESCRIPTION_BY_STATE[state];

//   const componentRef = useRef<HTMLDivElement>(null);
//   const dragHandleRef = useRef<HTMLDivElement>(null);

//   useDraggableElement(componentRef, dragHandleRef);

//   useLayoutEffect(() => {
//     const observer = new MutationObserver(() => {
//       if (!document.body.dataset["collaboration"]) return;
//       setState(document.body.dataset["collaboration"] as IConnectionState);
//     });

//     observer.observe(document.body, {
//       attributes: true,
//       attributeFilter: ["data-collaboration"],
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (!initialized) return setInitialized(true);
//     if (!componentRef.current) return;

//     const oldHeight = componentRef.current.getBoundingClientRect().height;
//     const newHeight = HEIGHT_BY_STATE[state];

//     componentRef.current.style.width = `${WIDTH_BY_STATE[state]}px`;
//     componentRef.current.style.height = `${HEIGHT_BY_STATE[state]}px`;

//     componentRef.current.style.top = `${
//       componentRef.current.offsetTop - (newHeight - oldHeight)
//     }px`;
//   }, [state]);

//   return (
//     <div className="caisy-connection-indicator-container">
//       <div ref={componentRef} className="caisy-connection-indicator">
//         <div className="caisy-connection-indicator-header">
//           <div
//             ref={dragHandleRef}
//             className="caisy-connection-indicator-icon-drag"
//           >
//             <IconDragHandle />
//           </div>
//           <div
//             className={`caisy-connection-indicator-content --${state.toLowerCase()}`}
//           >
//             <IconCaisy />
//             Live Preview {state}
//           </div>
//         </div>

//         {description && (
//           <div className="caisy-connection-indicator-description">
//             {description}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };



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
    if (!state) return;
    description = DESCRIPTION_BY_STATE[state];

    const descriptionElement = createElement({
      tagName: "div",
      className: "caisy-connection-indicator-description",
      content: description,
    });

    content?.classList.remove("--connected", "--reconnecting", "--disconnected");

    content?.classList.add(`--${state.toLowerCase()}`);

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

    indicator.style.top = `${
      indicator.offsetTop - (newHeight - oldHeight)
    }px`;

  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-collaboration"],
  });

  return { connectionIndicator: indicatorContainer, observer };
};
