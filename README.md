# Kezab website

A bilingual village website built with Hugo 0.167.0 extended and Hextra 0.13.0. Persian is served at `/` and English at `/en/`.

Install Hugo 0.167.0 extended and Go 1.21 or newer. Start a local preview with:

```sh
hugo server --bind 127.0.0.1 --port 1313
```

Build the production site with `hugo --gc --minify`.

The theme's [FlexSearch 0.8.143](https://www.npmjs.com/package/flexsearch/v/0.8.143) and [PhotoSwipe 5.4.4](https://www.npmjs.com/package/photoswipe/v/5.4.4) files are bundled in `assets/vendor` so builds do not need CDN access. Their licenses are included in `static/licenses`.

[Roboto](https://github.com/google/fonts/tree/main/ofl/roboto) and [Vazirmatn](https://github.com/google/fonts/tree/main/ofl/vazirmatn) are self-hosted in `static/fonts`. The variable WOFF2 files cover weights 100–900. They use Google Fonts' Latin and Arabic subsets. Both SIL Open Font License files are included in `static/licenses`.

[kezab.ir](https://kezab.ir/) is hosted on Cloudflare Pages. The build command is `hugo --gc --minify` and the output directory is `public`. Set `HUGO_VERSION=0.167.0` for both Production and Preview in the Pages build variables.
