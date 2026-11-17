export function allowsPreviewFormOrigin(headers: Headers, customerOrigin: string, adminOrigin?: string) {
  const origin = headers.get('origin')
  return origin === customerOrigin || origin === adminOrigin || (origin === 'null' && headers.get('sec-fetch-site') === 'same-origin')
}
