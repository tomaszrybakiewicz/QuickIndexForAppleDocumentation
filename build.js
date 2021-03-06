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

const fs = require("fs");
const { spawn } = require("child_process");

const manifest = JSON.parse(fs.readFileSync("manifest.json", { encoding: "utf-8" }));
const version = manifest.version;
const name = manifest.name.replace(/\s/g, "");
const outputDir = `build`;
fs.mkdirSync(outputDir, { recursive: true });

const outputFile = `${outputDir}/${name}${version}.zip`;
if (fs.existsSync(outputFile)) {
  fs.unlinkSync(outputFile);
}
const files = [
  "images",
  "src",
  "manifest.json",
  "LICENSE"
];
const zip = spawn("zip", ["-r", outputFile, ...files]);

console.log(`Zipping ${version} release...`);
zip.stdout.on("data", (data) => {
  console.log(`${data}`);
});

zip.stderr.on("data", (data) => {
  console.log("FAILED");
  console.log(`${data}`);
});

zip.on("close", (code) => {
  if (code === 0) {
    console.log("SUCCESS");
    console.log(`${outputFile}`);
  }
});
