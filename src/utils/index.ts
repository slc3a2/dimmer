import { EXCLUDE_URLS_KEY } from '@/constant'

const matchWildcardUrls = (url: string, options = ''): boolean => {
  let patterns = []
  const exactUrls = options.length === 0 ? localStorage.getItem(EXCLUDE_URLS_KEY) : options
  const notExist = exactUrls === '' || exactUrls === null || exactUrls === undefined
  patterns = notExist ? [] : exactUrls.split('\n')
  for (let pattern of patterns.filter((i) => i)) {
    try {
      const regex = new RegExp(pattern)
      if (regex.test(url)) {
        return true
      }
    } catch (error) {
      console.error(`Dimmer invalid regex pattern: ${pattern}`, error)
    }
  }

  return false
}
export { matchWildcardUrls }
