/**
 * Copyright (c) 2019-present, Tomasz Rybakiewicz.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See
 * the License for the specific language governing permissions and limitations under the License.
 */

/**
 * Returns an array of all header tags and tags annotated with class "symbol-name".
 *
 * <pre>
 *   type Tag = {
 *     type: "header"|"symbol",
 *     element: HTMLElement,
 *     level: number,    // depth based on header tag: h1 -> 1, h2 -> 2 etc.
 *     top: number       // y position relative to the viewport
 *   }
 * <pre>
 *
 * @returns {Array<Tag>} array of Tags asc sorted by 'top' property
 */
function headerTags() {
  let tags = [];
  let i = 1;
  while (true) {
    const level = i;
    const tag = `h${i++}`;
    const elements = Array.from(document.getElementsByTagName(tag))
      .map((element) => ({type: "header", element, level, top: element.getBoundingClientRect().y}));
    if (elements.length === 0) break;
    tags = [...tags, ...elements];
  }
  const symbolTags = Array.from(document.getElementsByClassName("symbol-name"))
    .map((element) => ({type: "symbol", element, level: i, top: element.getBoundingClientRect().y + 20}));
  tags = [...tags, ...symbolTags];

  tags.sort((l, r) => l.top - r.top);

  return tags;
}

/**
 * Replaces all '<' and '>' characters with equivalent HTML entites.
 *
 * @param {string} str
 * @returns {string}
 */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Iterates over Tags and returns quick menu HTMLElement.
 *
 * @param {Array<Tag>} tags
 * @returns {HTMLElement}
 */
function quickMenu(tags) {
  const ul = document.createElement("ul");
  ul.setAttribute("style", `
    list-style-type: none;
    margin: 0;
    width: max-content;
    font-size: 12px;
  `);

  tags.forEach((item) => {
    const li = document.createElement("li");
    const textColor = item.type === "symbol" ? "#0070c9" : "#000";
    li.setAttribute("style", `padding: 0 ${(item.level-1)*5}px; cursor: pointer; color: ${textColor};`);
    li.innerHTML = htmlEntities(item.element.innerText);
    const offsetTop = 60;
    li.onclick = () => {
      window.scrollTo({
        left: 0,
        top: item.element.getBoundingClientRect().y - document.body.getBoundingClientRect().y - offsetTop,
        behavior: 'auto'
      });
    };
    ul.appendChild(li);
  });

  return ul;
}

/**
 * Injects fixed, resizable left panel into a document body.
 *
 * @returns {HTMLElement} reference to panel content HTMLElement
 */
function installResizableFloatingLeftPanel(width) {
  const panel = document.createElement("div");
  panel.setAttribute("style", `
    position: fixed;
    top: 125px;
    z-index: 1000;
    border: 1px solid #e6e6e6;
    margin: 0;
    height: 70vh;
    width: ${width}vw;
    overflow: hidden;
    border-radius: 0 5px 5px 0;
    background-color: #f9fafa;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
  `);
  document.body.appendChild(panel);

  const content = document.createElement("div");
  panel.appendChild(content);
  content.setAttribute("style", `
    width: 100%;
    overflow: auto;
    padding: 5px;
  `);

  const resizeHandle = document.createElement("div");
  panel.appendChild(resizeHandle);
  resizeHandle.setAttribute("style", `
    z-index: 1100;
    width: 5px;
    background-color: #e6e6e6;
    cursor: ew-resize;
  `);

  resizeHandle.onmousedown = (mousedownEvent) => {
    mousedownEvent.preventDefault();
    const w = panel.clientWidth;

    const mousemove = (mousemoveEvent) => {
      mousemoveEvent.preventDefault();
      const dx = mousedownEvent.screenX - mousemoveEvent.screenX;
      panel.style.width = `${w - dx}px`;
    };
    window.addEventListener("mousemove", mousemove);

    const mouseup = (mouseupEvent) => {
      mouseupEvent.preventDefault();
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    };
    window.addEventListener("mouseup", mouseup);
  };

  return content;
}

///////////////// MAIN ////////////////
chrome.storage.sync.get({
  width: 15,
  enabled: true
}, function(items) {
  if (!items.enabled) return;

  const panel = installResizableFloatingLeftPanel(items.width);
  panel.id = "tr-quick_index";
  panel.appendChild(quickMenu(headerTags()));
});
