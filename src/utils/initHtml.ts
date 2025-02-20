/**
* Allows to create a new HTML element with the provided tag, text content, and class list.
* 
* @param {string} tag The tag name
* @param {string} textContent the text content
* @param {string} classList List of classes to add to the element
* @returns {HTMLElement} The new HTML element
*/
export function createHtmlElement(tag: string, textContent: string, classList: string[] = []): HTMLElement {
    const element = document.createElement(tag);
    element.textContent = textContent;
    element.classList.add(...classList);
    return element;
  }