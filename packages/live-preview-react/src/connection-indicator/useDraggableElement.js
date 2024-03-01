"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDraggableElement = void 0;
const react_1 = require("react");
const useDraggableElement = (componentRef, dragHandleRef) => {
    const dragElement = (0, react_1.useCallback)(() => {
        if (!componentRef.current || !dragHandleRef.current)
            return;
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const dragMouseDown = (e) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };
        const elementDrag = (e) => {
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
        }
        else {
            componentRef.current.onmousedown = dragMouseDown;
        }
    }, [componentRef, dragHandleRef]);
    (0, react_1.useEffect)(() => {
        dragElement();
    }, [dragHandleRef]);
};
exports.useDraggableElement = useDraggableElement;
