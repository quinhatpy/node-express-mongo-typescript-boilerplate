export const getFullUrlPath = (
  path: string,
  version: string,
  type = 'api',
): string => {
  const url = version ? `/${type}/${version}/${path}` : `/api/${path}`

  return url
}
