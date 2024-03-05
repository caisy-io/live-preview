import { MutableRefObject, RefObject, useCallback, useEffect } from "react";

export const useDraggableElement = (
  componentRef: RefObject<HTMLDivElement>,
  dragHandleRef: RefObject<HTMLDivElement>
) => {
  const dragElement = useCallback(() => {
    if (!componentRef.current || !dragHandleRef.current) return;

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e: MouseEvent) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      componentRef.current.style.top =
        componentRef.current.offsetTop - pos2 + "px";
      componentRef.current.style.left =
        componentRef.current.offsetLeft - pos1 + "px";
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    if (dragHandleRef.current) {
      dragHandleRef.current.onmousedown = dragMouseDown;
    } else {
      componentRef.current.onmousedown = dragMouseDown;
    }
  }, [componentRef, dragHandleRef]);

  useEffect(() => {
    dragElement();
  }, [dragHandleRef]);
};
