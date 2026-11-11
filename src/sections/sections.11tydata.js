// Every markdown file under src/sections/<page>/ is a section of that page.
// It never gets its own URL; the page layout pulls sections in by folder name,
// in filename order (10-hero.md, 20-work.md, ...).
// Frontmatter `type` picks the partial in src/_includes/sections/<type>.njk.
export default {
  permalink: false,
  layout: false,
  tags: ["section"],
  eleventyExcludeFromCollections: false,
  eleventyComputed: {
    pageSlug: (data) => data.page.inputPath.split("/").at(-2),
  },
};
