# Kezab website update plan

This records the earlier site update. The custom Hugo layouts now replace Hextra. Language and appearance settings share the header, and search uses a native dialog and per-language JSON index. See README.md for the current setup.

Implement the dependency updates and UI/UX improvements below. The user approved this scope on October 3, 2026. Persian must be the default language at `https://kezab.ir/`. Keep English available under `/en/`.

Implementation is complete. Production builds and desktop and phone checks pass. Actual touch gestures and browser zoom remain manual checks.

## Phases

1. Update Hugo and Hextra, migrate the galleries, and change the language routes.
2. Update the homepage, About, Gallery, Contact, and bilingual navigation.
3. Apply the palette, responsive layout, keyboard focus, and reduced motion changes.
4. Build and inspect the result, review the diff, create a PR, and keep the local preview running.

## Starting state

- The site uses Hugo with Hextra. There is no npm application.
- `go.mod` pins Hextra 0.8.4 and hugo-shortcode-gallery 1.3.0.
- The local Hugo installation is 0.145.0 extended. Local Go is 1.24.5.
- The production Hugo version is unknown. No deployment configuration is checked into this repository.
- English currently occupies `/`. Persian occupies `/fa/`.
- Both languages have a homepage, About, Gallery, and Contact.
- The repository has 41 existing WebP images under `assets/album/`.
- The code and live site were reviewed on desktop and at a 390 by 844 phone viewport.

## Implemented state

- Hugo 0.167.0 extended is installed alongside the original local version. The local preview uses the new version.
- Cloudflare Pages Production and Preview both pin `HUGO_VERSION=0.167.0`. The build command remains `hugo --gc --minify` with output in `public`.
- Hextra is pinned to 0.13.0. The third-party gallery module is removed.
- Persian occupies `/`. English occupies `/en/`. All four old Persian routes have aliases.
- The theme's existing FlexSearch 0.8.143 and PhotoSwipe 5.4.4 files are bundled with their licenses. This avoids build-time CDN access.
- All eight pages were inspected at 1365 by 900, 390 by 844, and 320 by 800. No page-wide horizontal overflow or visible broken images was found.
- Section links and search results land below the header. The mobile menu scrolls on short screens.
- The language switch is a text link to the matching page. The header has no search control. A muted RSS link sits in the compact footer.
- Contact descriptions and email links are centered in both languages. English uses Roboto and Persian uses Vazirmatn. Both fonts are self-hosted with their licenses.
- The centered page, header, and footer share a 900px maximum width. Empty desktop sidebar columns are hidden, and the mobile menu remains available.
- Warm stone and olive colors pair with a warm charcoal dark theme. Body text uses 16px Roboto at 1.65 line height and 17px Vazirmatn at 1.85. Headings are smaller, prose is limited to 66ch, and corners use an 8px radius.
- Gallery is the emphasized homepage action. About section links are plain, facts use compact label/value rows, and the contact footer fits within the viewport on short pages.

## Dependency updates

- [x] Recheck release notes before implementation. The verified targets on October 3, 2026 are Hugo 0.167.0 extended and Hextra 0.13.0.
- [x] Set `baseURL: https://kezab.ir/` explicitly in `hugo.yaml`. Hugo 0.167.0 changes the default base URL to `https://example.org/`.
- [x] Upgrade Hugo and pin the same version in the actual deployment configuration. Inspect the hosting setup before changing it.
- [x] Upgrade Hextra and update `go.mod` and `go.sum`.
- [x] Migrate all 22 gallery shortcodes across About and Gallery in both languages to Hextra's built-in PhotoSwipe gallery. Then remove hugo-shortcode-gallery from `go.mod`, `go.sum`, and `hugo.yaml`.
- [x] Check the custom head partial, CSS, icons, cards, and search against the upgraded theme.

The gallery migration must accompany the theme upgrade. Both modules define a shortcode named `gallery`. Existing calls use `globalMatch` and have no closing tag. Hextra's new gallery uses a paired container with nested `gallery-item` entries. A version-only upgrade can break these calls. The new gallery supports the existing global assets, generated thumbnails, captions, alt text, and keyboard navigation.

## Persian as the default

- [x] Set `defaultContentLanguage: fa` and `defaultContentLanguageInSubdir: false`.
- [x] Mark the existing English content explicitly with `.en.md` filenames. Rename `content/_index.md`, `content/about/_index.md`, `content/gallery/_index.md`, and `content/contact.md` to their `.en.md` equivalents. Keep the existing `.fa.md` files as Persian. Unsuffixed files follow the default language, so changing the setting alone would assign the English files to Persian.
- [x] Give Persian weight 1 and English weight 2.
- [x] Use Hugo's current language configuration keys, including `label`, `direction`, and `locale`. Preserve Persian RTL and English LTR behavior.
- [x] Give each language its own site title. Use `روستای کذاب` for Persian and `Kezab Village` for English.
- [x] Update internal links, cards, menus, search results, feeds, canonical URLs, language alternates, and sitemap URLs for the new routes.
- [x] Preserve old Persian page URLs with redirects or Hugo aliases to their corresponding new routes. Check each page, not only `/fa/`.

| Page | Persian | English | Old Persian route |
| --- | --- | --- | --- |
| Home | `/` | `/en/` | `/fa/` |
| About | `/about/` | `/en/about/` | `/fa/about/` |
| Gallery | `/gallery/` | `/en/gallery/` | `/fa/gallery/` |
| Contact | `/contact/` | `/en/contact/` | `/fa/contact/` |

The old English root routes become Persian routes. Keep them serving Persian and place the English equivalents under `/en/`. The language switch must open the matching translated page.

## Homepage

- [x] Lead with one suitable existing village photograph.
- [x] Put a short factual introduction and immediate About/Gallery links near the top.
- [x] Keep the remaining information concise and easy to scan in both languages.
- [x] Use the existing content as the factual source. Do not add claims about the village without evidence.

## Gallery

- [x] Keep the existing exterior, interior, and winter categories.
- [x] Choose a fixed photo order instead of `randomize=true`.
- [x] Add descriptive alt text and short captions in both languages. Describe what is visible without guessing names, dates, or locations.
- [x] Provide clearly named lightbox controls, visible keyboard focus, Escape to close, and focus return to the selected thumbnail.
- [x] Keep thumbnails responsive and reserve image space while loading.
- [x] Preserve access to all 41 images across About and Gallery.

The current gallery images have no accessible descriptions. The existing Swipebox controls also lack accessible labels and proper tab focus.

## About

- [x] Add compact section navigation for location, topography, climate, and water sources.
- [x] Fix heading levels so sections follow the page title.
- [x] Present basic village facts vertically on phones. The current six-column table requires horizontal scrolling.
- [x] Keep comparison tables readable with local horizontal scrolling where needed. Prevent page-wide overflow.
- [x] Preserve the existing content, measurements, and images. Do not make unsupported climate or historical claims more prominent.

## Bilingual navigation and contact

- [x] Put a visible language switch in the header on desktop and phone.
- [x] Keep navigation labels short, translated, and consistent between desktop and mobile menus.
- [x] Translate remaining English labels on Persian pages. The user requested the visible RSS acronym in the footer instead of a Persian feed label.
- [x] Make footer attribution and year consistent across both languages.
- [x] Replace the icon-only email link with a visible email address or named email button. Preserve `contact@kezab.ir`.
- [x] Correct the English contact sentence that currently says, "I would be happy to share them with me."

## Visual polish

- [x] Use the approved warm stone and olive palette with a warm charcoal dark theme and readable text contrast.
- [x] Make spacing, image corners, links, and buttons consistent.
- [x] Center the page within 900px and align its gutters with the header and footer. Remove empty desktop columns while preserving mobile navigation.
- [x] Apply language-specific body size and line height, a 66ch prose limit, smaller headings, and 8px corners.
- [x] Emphasize the Gallery action and simplify About navigation and fact rows. Keep the theme set to System by default and preserve visitor choices.
- [x] Make table colors follow the selected Hextra theme. Current custom CSS only follows `prefers-color-scheme`.
- [x] Keep the design compact, minimal, and comfortable to read in both languages.
- [x] Respect reduced motion and show visible keyboard focus.

## Verification and completion

- [x] Run a production build with the pinned Hugo version and resolve relevant errors or warnings.
- [x] Inspect every Persian and English page on desktop and phone, including a narrow phone.
- [ ] Check actual browser zoom manually. A narrow viewport does not verify browser zoom.
- [x] Verify Persian at `/`, English at `/en/`, and all legacy Persian redirects.
- [x] Verify the language switch, navigation, search, email link, and image loading.
- [x] Test lightbox controls with keyboard and pointer clicks. Check close behavior and focus return.
- [ ] Check lightbox swipe and pinch gestures on an actual touch device.
- [x] Inspect tables in light, dark, and system themes. Check RTL, text wrapping, and horizontal overflow.
- [x] Inspect canonical URLs, language alternates, feeds, and sitemap output. Ensure no `example.org` or localhost production URLs remain.
- [x] Review the final diff for unrelated changes and update the checkboxes in this file.

Read files before editing. Keep changes within this scope. No new dependency is needed beyond the accepted upgrades. The user authorized implementation, a PR, and a running local preview on October 3, 2026. Production deployment follows a later merge.

## References

- [Hextra 0.13 release notes](https://imfing.github.io/hextra/blog/v0.13/)
- [Hextra gallery documentation at 0.13.0](https://raw.githubusercontent.com/imfing/hextra/v0.13.0/docs/content/docs/guide/shortcodes/gallery.md)
- [Hugo 0.167.0 release notes](https://github.com/gohugoio/hugo/releases/tag/v0.167.0)
- [Hugo language configuration](https://gohugo.io/configuration/languages/)
