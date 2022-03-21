export function extractString(string, numOfWords) {
  const words = string.split(' ')
  if (words.length > numOfWords) {
    return words.slice(0, numOfWords).join(' ')
  } else {
    return string
  }
}
