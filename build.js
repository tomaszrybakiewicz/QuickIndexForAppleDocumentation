
const fs = require("fs");
const { spawn } = require("child_process");

const files = [
  "LICENSE",
  "build.js",
  "images",
  "manifest.json",
  "src"
];

const manifest = JSON.parse(fs.readFileSync("manifest.json", { encoding: "utf-8" }));
const version = manifest.version;
const name = manifest.name.replace(/\s/g, "");
const outputDir = `build/${version}/`;
fs.mkdirSync(`build/${version}/`);

const outputFile = `${outputDir}/${name}${version}.zip`;
const zip = spawn("zip", [outputFile, ...files]);

console.log("Creating release...");
zip.stdout.on("data", (data) => {
  console.log(data);
});

zip.stderr.on("data", (data) => {
  console.log(data);
});

zip.on("close", (code) => {
  console.log("DONE");
});
