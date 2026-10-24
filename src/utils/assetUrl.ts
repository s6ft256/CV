export interface AssetUrlOptions {
  baseUrl?: string
  currentLocation?: string
}

export function resolveAssetUrl(path: string, options: AssetUrlOptions = {}) {
  const encodedPath = path
    .split('/')
    .map(segment => encodeURIComponent(decodeURIComponent(segment)))
    .join('/')

  const baseUrl = options.baseUrl ?? import.meta.env.BASE_URL ?? './'
  const currentLocation =
    options.currentLocation ??
    (typeof window !== 'undefined' ? window.location.href : 'http://localhost/')

  const currentUrl = new URL(currentLocation, 'http://localhost/')
  const currentPath = currentUrl.pathname.endsWith('/')
    ? currentUrl.pathname
    : `${currentUrl.pathname}/`

  const normalizedBase =
    baseUrl === './' || baseUrl === '/'
      ? new URL(currentPath, `${currentUrl.origin}/`).toString()
      : baseUrl.replace(/\/?$/, '/')

  if (normalizedBase.startsWith('http://') || normalizedBase.startsWith('https://')) {
    return new URL(encodedPath, normalizedBase).toString()
  }

  return `${normalizedBase}${encodedPath}`.replace(/([^:]\/)\/{2,}/g, '$1/')
}
