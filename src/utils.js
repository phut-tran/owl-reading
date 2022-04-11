import translate from 'translate'

const DICTIONARY_ENDPOINT = 'https://api.dictionaryapi.dev/api/v2/entries'

export function extractString(string, numOfWords) {
  const words = string.split(' ')
  if (words.length > numOfWords) {
    return words.slice(0, numOfWords).join(' ')
  } else {
    return string
  }
}

export function getWordDefinition(keyword) {
  const endpoint = `${DICTIONARY_ENDPOINT}/en/${keyword}/`
  return window.fetch(endpoint)
    .then(extractDefinition)
}

async function extractDefinition(res) {
  try {
    const [dictionary] = await res.json()
    const { meanings, phonetic, phonetics, word } = dictionary
    const { partOfSpeech } = meanings[0]
    const audioUrls = phonetics.map(({ audio }) => audio).filter(audio => audio)
    const translation = await translate(word, 'vi')
    return {
      keyword: word,
      partOfSpeech,
      phonetic,
      audio: audioUrls[0],
      translation,
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export const partsOfSpeech = [
  'noun',
  'pronoun',
  'verb',
  'adjective',
  'adverb',
  'preposition',
  'conjunction',
  'interjection'
]
