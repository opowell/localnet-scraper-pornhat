import { afterEach, describe, expect, it } from 'vitest'
import { parserLoader, resetPage, setSiteRules, useSourceRules, videoEmbed, visit } from '#scraper-test'

// The parser, evaluated with the helpers it is injected with, as a scrape runs it.
const load = parserLoader(__dirname)

afterEach(resetPage)

describe('pornHat', () => {
  it('reads https://www.pornhat.com/search/red/ as a listing of what it links to', async () => {
    const { parsePornHat } = load('pornhat.js', ['parsePornHat'])
    visit('https://www.pornhat.com/search/red/', '<a href="/video/a-video/">A</a><a href="/tags/red/">red</a>')
    expect(await parsePornHat()).toEqual({ listing: true, links: [{ url: 'https://www.pornhat.com/video/a-video/', score: 1 }] })
  })

  it('plays its videos in the site\'s own player, as its source says', () => {
    useSourceRules(__dirname)
    expect(videoEmbed('https://www.pornhat.com/embed/807573')).toBe('https://www.pornhat.com/embed/807573')
    setSiteRules([])
  })
})
