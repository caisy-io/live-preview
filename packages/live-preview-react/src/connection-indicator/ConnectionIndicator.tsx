import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import IconDragHandle from "./IconDragHandle";
import IconCaisy from "./IconCaisy";
import { useDraggableElement } from "./useDraggableElement";

const DESCRIPTION_BY_STATE = {
  Disconnected: (
    <p>
      You connection has timed, out, to continue restart the preivew in{" "}
      <strong>caisy</strong>
    </p>
  ),
  Reconnecting: (
    <p>
      Connected to the preview server, but there is no active caisy window to
      connect to
    </p>
  ),
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

export const ConnectionIndicator: FC = () => {
  const [initialized, setInitialized] = useState(false);
  const [state, setState] = useState<IConnectionState>("Connected");

  const description = DESCRIPTION_BY_STATE[state];

  const componentRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  useDraggableElement(componentRef, dragHandleRef);

  useLayoutEffect(() => {
    const observer = new MutationObserver(() => {
      if (!document.body.dataset["collaboration"]) return;
      setState(document.body.dataset["collaboration"] as IConnectionState);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-collaboration"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!initialized) return setInitialized(true);
    if (!componentRef.current) return;

    const oldHeight = componentRef.current.getBoundingClientRect().height;
    const newHeight = HEIGHT_BY_STATE[state];

    componentRef.current.style.width = `${WIDTH_BY_STATE[state]}px`;
    componentRef.current.style.height = `${HEIGHT_BY_STATE[state]}px`;

    componentRef.current.style.top = `${
      componentRef.current.offsetTop - (newHeight - oldHeight)
    }px`;
  }, [state]);

  return (
    <div className="caisy-connection-indicator-container">
      <div ref={componentRef} className="caisy-connection-indicator">
        <div className="caisy-connection-indicator-header">
          <div
            ref={dragHandleRef}
            className="caisy-connection-indicator-icon-drag"
          >
            <IconDragHandle />
          </div>
          <div
            className={`caisy-connection-indicator-content --${state.toLowerCase()}`}
          >
            <IconCaisy />
            Live Preview {state}
          </div>
        </div>

        {description && (
          <div className="caisy-connection-indicator-description">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
