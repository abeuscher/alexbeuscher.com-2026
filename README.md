# alexbeuscher.com

Static site built with [Eleventy 3](https://www.11ty.dev/). SCSS is compiled with Dart Sass and JS is bundled with esbuild, both as part of the Eleventy build.

## Commands

```bash
npm install
npm run dev     # clean dist/, build, serve at http://localhost:8080 with live reload
npm run build   # clean dist/, production build (minified CSS/JS, no sourcemaps)
```

Deploy the contents of `dist/`.

## How content works

Each page is a small file in `src/` (`voice-over.md`, etc.) holding only page-level settings: title, meta description, and the contact prompt at the bottom.

The body of each page is a folder of **section files** in `src/sections/<page>/`. Sections render in filename order, so number them with gaps (`10-hero.md`, `20-samples.md`, ...) to leave room for inserting new ones. The `type` in each file's frontmatter picks the template in `src/_includes/sections/`:

| type | Use for | Frontmatter |
|---|---|---|
| `hero` | Page opener | `eyebrow`, `headline`, `subhead`, `actions` (buttons), `audio` (featured player) |
| `prose` | Any block of writing | `heading`, `link`, `variant` (e.g. `story`). Body = markdown |
| `cards` | Portfolio items, service doors, mini-stories | `heading`, `columns` (2–4), `items` (title, meta, text, href, linkLabel, image, imageAlt) |
| `audio` | VO samples | `heading`, `groups` (label, samples: title, context, src). Body = note under the players |
| `history` | Work history | `heading`, `tag` (`web`, `vo`, `tech`, `copy`, or `all`), `compact` (one-liners instead of bullets), `link` |
| `skills` | Resume skills | `heading` (pulls from `_data/skills.yaml`) |
| `resume-header` | Resume top block with PDF button | `tagline` |

Any section can take `anchor` to give it an id (e.g. `anchor: work` for `#work` links).

**YAML gotcha:** a frontmatter value containing `: ` needs quotes, e.g. `heading: "Featured project: NpHelper"`.

## Data

- `src/_data/site.js`: name, email, phone, social links, menu items
- `src/_data/history.yaml`: the one work history. `/resume` shows every entry; service pages show the entries tagged for them. `summary` is used in compact views and `bullets` on the resume.
- `src/_data/skills.yaml`: resume skills

## Files you need to supply

Everything in `src/static/` is copied to the site root.

- `src/static/resume.pdf`
- `src/static/audio/demo-main.mp3`, plus each sample referenced in `src/sections/voice-over/20-samples.md`
- `src/static/images/work/djmichael.jpg`, `nphelper.jpg` (screenshots, around 1200px wide)

Search the project for `TODO` to find every placeholder.

## Styling

`src/assets/scss/_tokens.scss` holds the type, color, and spacing tokens, including dark mode. The look-and-feel pass should mostly happen there and in `_sections.scss`.

## Not yet done

- Redirects from the old site's URLs (needs the old URL list and the host's redirect format)
- Per-page social share images (`shareImage` in a page's frontmatter is already supported)
- Favicon
