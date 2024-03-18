export const useDraggableElement = (
  component?: HTMLElement,
  dragHandle?: HTMLElement
) => {
  const dragElement = () => {
    if (!component || !dragHandle) return;

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

      const styles = getComputedStyle(component)
      const top = styles.getPropertyValue('top')
      const left = styles.getPropertyValue('left')

      component.style.top = `calc(${top} - ${pos2}px)`;
      component.style.left = `calc(${left} - ${pos1}px)`;
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    if (dragHandle) {
      dragHandle.onmousedown = dragMouseDown;
    } else {
      component.onmousedown = dragMouseDown;
    }
  };

  dragElement();
};
