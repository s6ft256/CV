import { describe, expect, it } from 'vitest'
import { resolveAssetUrl } from '../utils/assetUrl'

describe('resolveAssetUrl', () => {
  it('keeps certificate files under the current app base path on deployed subpaths', () => {
    expect(
      resolveAssetUrl('iosh.pdf', {
        baseUrl: './',
        currentLocation: 'https://example.com/cv/',
      })
    ).toBe('https://example.com/cv/iosh.pdf')
  })

  it('preserves encoded filenames with spaces', () => {
    expect(
      resolveAssetUrl('AI for Beginners.pdf', {
        baseUrl: '/',
        currentLocation: 'https://example.com/',
      })
    ).toBe('https://example.com/AI%20for%20Beginners.pdf')
  })
})
