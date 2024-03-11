export const createElement = ({
  tagName,
  options,
  className,
  content,
  children,
}: {
  tagName: string;
  options?: ElementCreationOptions;
  className?: string;
  content?: string;
  children?: HTMLElement | HTMLElement[];
}): HTMLElement => {
  const element = document.createElement(tagName, options);
  element.className = className;

  if (content) {
    element.innerHTML = content;
  }

  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => element.appendChild(child));
      return element;
    } else {
      element.appendChild(children);
    }
  }

  return element;
};
