export type UrlCheck =
  | { state: 'empty' }
  | { state: 'invalid' }
  | { state: 'unavailable'; host: string }
  | { state: 'valid'; host: string; normalized: string }

const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/
const PRIVATE_SUFFIXES = ['.local', '.internal', '.lan', '.localhost', '.test']

export function checkUrl(raw: string): UrlCheck {
  const value = raw.trim()
  if (!value) return { state: 'empty' }
  if (/\s/.test(value)) return { state: 'invalid' }

  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`
  let url: URL
  try {
    url = new URL(withScheme)
  } catch {
    return { state: 'invalid' }
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return { state: 'invalid' }

  const host = url.hostname.toLowerCase()
  if (host === 'localhost' || IPV4.test(host) || host.startsWith('[') || PRIVATE_SUFFIXES.some((s) => host.endsWith(s))) {
    return { state: 'unavailable', host }
  }
  if (!/^([a-z\d-]+\.)+[a-z]{2,}$/i.test(host)) return { state: 'invalid' }

  const path = url.pathname === '/' ? '' : url.pathname
  return { state: 'valid', host, normalized: `${url.protocol}//${host}${path}` }
}
