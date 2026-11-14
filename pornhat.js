// A video's page on PornHat, /video/<slug>/.
const PORNHAT_VIDEO = /^https:\/\/(?:www\.)?pornhat\.com\/video\/[^/?#]+\/$/

// A video page (/video/desi-wife-gets-fucked/) is one video (see videoPage), played in PornHat's player (its JSON-LD's
// embedUrl), described as its JSON-LD describes it: its uploader the studio it is "by" (/sites/…), its categories the
// studio's site it is from (/paysite/…), its performers the models named in it, its tags those under it, and the
// videos related to it those of .related-videos. Any other page (the home page, a tag, a model, a search) is a listing
// of the videos it shows.
function parsePornHat(_profileId) {
  if (!/(?:^|\.)pornhat\.com$/.test(location.hostname)) {
    return null
  }
  const here = location.href.split(/[?#]/)[0]
  if (!PORNHAT_VIDEO.test(here)) {
    return videoListing(url => (PORNHAT_VIDEO.test(url.split(/[?#]/)[0]) ? url.split(/[?#]/)[0] : null))
  }
  const studio = namedLinks('.video-info .video-link a[href^="/sites/"], .video-info .video-link a[href*="pornhat.com/sites/"]')[0]
  const credited = jsonLdPeople(jsonLdVideo().author)
  return videoPage({
    title: document.querySelector('.video-info h1')?.innerText.trim() || undefined,
    authors: studio ? [{ name: studio.text, url: studio.url }] : credited,
    performers: namedLinks('.video-info a[href*="/models/"]'),
    categories: namedLinks('.video-info .video-link a[href*="/paysite/"], .video-info a[href*="/categories/"]'),
    tags: namedLinks('.video-info .video-tags a[href*="/tags/"]'),
    related: linkUrls('.related-videos a[href*="/video/"]').map(url => url.split(/[?#]/)[0]).filter(url => PORNHAT_VIDEO.test(url)),
  })
}

// The parser a scrape calls.
registerParser(parsePornHat)
