import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import * as sass from "sass";
import * as esbuild from "esbuild";

const isProd = process.env.ELEVENTY_ENV === "production";
const OUT = "dist";

async function buildAssets() {
  // SCSS -> CSS
  const cssOut = path.join(OUT, "assets/css/main.css");
  fs.mkdirSync(path.dirname(cssOut), { recursive: true });
  const result = sass.compile("src/assets/scss/main.scss", {
    style: isProd ? "compressed" : "expanded",
    sourceMap: !isProd,
    sourceMapIncludeSources: true,
  });
  let css = result.css;
  if (!isProd && result.sourceMap) {
    fs.writeFileSync(cssOut + ".map", JSON.stringify(result.sourceMap));
    css += "\n/*# sourceMappingURL=main.css.map */";
  }
  fs.writeFileSync(cssOut, css);

  // JS -> bundle
  await esbuild.build({
    entryPoints: ["src/assets/js/main.js"],
    bundle: true,
    format: "esm",
    target: "es2020",
    minify: isProd,
    sourcemap: !isProd,
    outfile: path.join(OUT, "assets/js/main.js"),
    logLevel: "warning",
  });
}

export default function (eleventyConfig) {
  // YAML data files
  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));

  // Asset bundling runs before every build (and every rebuild in dev)
  eleventyConfig.on("eleventy.before", buildAssets);
  eleventyConfig.addWatchTarget("src/assets/");

  // Static files (resume.pdf, audio, images, favicon) copy to site root
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // Sections for a page, in filename order (10-hero.md, 20-work.md, ...)
  eleventyConfig.addFilter("sectionsFor", (items, slug) =>
    (items || [])
      .filter((i) => i.data.pageSlug === slug)
      .sort((a, b) => a.inputPath.localeCompare(b.inputPath))
  );

  // Work history filtered by tag ("all" or empty returns everything)
  eleventyConfig.addFilter("byTag", (entries, tag) =>
    !tag || tag === "all" ? entries : (entries || []).filter((e) => (e.tags || []).includes(tag))
  );

  eleventyConfig.addFilter("markdown", (str) => (str ? md.render(String(str)) : ""));
  eleventyConfig.addFilter("markdownInline", (str) => (str ? md.renderInline(String(str)) : ""));
  eleventyConfig.addFilter("head", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("telHref", (str) => "tel:" + String(str || "").replace(/[^\d+]/g, ""));

  let md;
  eleventyConfig.amendLibrary("md", (lib) => {
    md = lib;
  });

  return {
    dir: { input: "src", output: OUT, includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}
