# PornHat scraper for Localnet

Reads `pornhat.com` pages for Localnet, a browser extension that is a personal search engine.
Localnet pulls it from here the first time it scrapes such a page, through the
[localnet-scrapers](https://github.com/opowell/localnet-scrapers) scraper source.

A video page (/video/desi-wife-gets-fucked/) is one video (see videoPage in Localnet's DOM helpers), played in PornHat's player (its JSON-LD's embedUrl), described as its JSON-LD describes it: its uploader the studio it is "by" (/sites/…), its categories the studio's site it is from (/paysite/…), its performers the models named in it, its tags those under it, and the videos related to it those of .related-videos. Any other page (the home page, a tag, a model, a search) is a listing of the videos it shows.

- `source.json`: what Localnet reads to know the scraper: its name, the URLs it reads, how the site is searched, and the file to run.
- `pornhat.js`: the parser. It is injected into the scraped page after Localnet's DOM helpers (content-scripts/utils/dom.js) and defines `window.__dynamicParser`.
- `pornhat.test.ts`: its unit tests, run from a Localnet checkout (`pnpm parsers pull`, then `pnpm test parsers/localnet-scraper-pornhat`).
- `saved-pages/` (not in git): real pages saved from the site, which Localnet's `e2e/saved-pages.test.ts` scrapes. See Localnet's README.
- Its videos are played in Read in the site's own player (its embed page), as `source.json`'s `videos` says: the site's own files are signed for the viewer's address or for a few hours.
