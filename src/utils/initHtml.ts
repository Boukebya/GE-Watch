export function createHtmlElement(tag: string, textContent: string, classList: string[] = []): HTMLElement {
    const element = document.createElement(tag);
    element.textContent = textContent;
    element.classList.add(...classList);
    return element;
  }