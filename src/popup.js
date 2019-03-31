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
 
document.addEventListener('DOMContentLoaded', function() {
  const lbl_widthValue = document.getElementById("width");
  const cb_enabled = document.getElementById("enabled");
  let width = 15;

  function save_options() {
    const enabled = cb_enabled.checked;
    chrome.storage.sync.set({ width, enabled });
  }

  chrome.storage.sync.get({
    width,
    enabled: true
  }, function(items) {
    width = items.width;
    lbl_widthValue.innerHTML = `${items.width}%`;
    cb_enabled.checked = items.enabled;
  });

  document.getElementById("width-sub").addEventListener('click', function() {
    width = Math.max(0, width - 5);
    lbl_widthValue.innerHTML = `${width}%`;
    save_options();
  });

  document.getElementById("width-add").addEventListener('click', function() {
    width = Math.min(width + 5, 100);
    lbl_widthValue.innerHTML = `${width}%`;
    save_options();
  });

  cb_enabled.addEventListener('change', save_options);

  document.getElementById("about").addEventListener('click', function() {
    window.open("https://github.com/tomaszrybakiewicz/QuickIndexForAppleDocumentation");
  });
});
