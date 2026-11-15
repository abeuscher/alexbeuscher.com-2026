// Renders /resume/print/ to src/static/resume.pdf.
// Run `npm run resume:pdf` after changing history.yaml, skills.yaml, or resume-print.njk.
// Needs Playwright with Chromium, installed in the project or globally (npm i -g playwright).
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

function loadPlaywright() {
  const roots = [process.cwd() + "/", execSync("npm root -g").toString().trim() + "/"];
  for (const root of roots) {
    try { return createRequire(root)("playwright"); } catch {}
  }
  throw new Error("Playwright not found. Install it with: npm i -g playwright && npx playwright install chromium");
}

const root = path.resolve("dist");
if (!fs.existsSync(path.join(root, "resume/print/index.html"))) {
  throw new Error("dist/resume/print/ is missing. Run `npm run build` first.");
}
const types = { ".html": "text/html", ".woff2": "font/woff2", ".css": "text/css" };
const server = http.createServer((req, res) => {
  let file = path.join(root, decodeURIComponent(req.url.split("?")[0]));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((ok) => server.listen(0, ok));

const { chromium } = loadPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:${server.address().port}/resume/print/`, { waitUntil: "networkidle" });
await page.pdf({ path: "src/static/resume.pdf", format: "Letter", printBackground: true, preferCSSPageSize: true });
await browser.close();
server.close();
console.log("Wrote src/static/resume.pdf");
