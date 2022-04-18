import translate from 'translate'
import dayjs from 'dayjs'

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

export const defaultRecallParams = {
  interval: 0,
  repetition: 0,
  efactor: 2.5,
  dueDate: dayjs(Date.now()).format('YYYY-MM-DD'),
  // https://github.com/Maxvien/supermemo#explanation
}

// https://stackoverflow.com/a/2450976/7583537
export function shuffle(array) {
  let currentIndex = array.length, randomIndex

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}


/*
  https://www.geeksforgeeks.org/longest-common-substring-dp-29/
  Returns length of longest common
  substring of str1 and str2
*/
export function longestCommonSubStr(str1, str2) {
  const LCStuff = Array(str1.length + 1)
    .fill()
    .map(() => Array(str2.length + 1).fill(0))

  let result = 0

  for (let i = 0; i <= str1.length; i++) {
    for (let j = 0; j <= str2.length; j++) {
      if (i === 0 || j === 0) {
        LCStuff[i][j] = 0
      } else if (str1[i - 1] === str2[j - 1]) {
        LCStuff[i][j] = LCStuff[i - 1][j - 1] + 1
        result = Math.max(result, LCStuff[i][j])
      } else {
        LCStuff[i][j] = 0
      }
    }
  }

  return result
}

export function gradeReproduceCheck(origin, reproduce) {
  const longestCommon = longestCommonSubStr(origin, reproduce)
  const percentOfCorrectness = longestCommon * 100 / origin.length
  if (percentOfCorrectness === 0) {
    return 0
  } else if (percentOfCorrectness < 10) {
    return 1
  } else if (percentOfCorrectness < 30) {
    return 2
  } else if (percentOfCorrectness < 60) {
    return 3
  } else if (percentOfCorrectness < 90) {
    return 4
  }
  return 5
}

const encourageFeedback = [
  'excellent',
  'well done',
  'very good',
  'correct',
  'outstanding',
  'magnificent',
  'exceptional',
  'smashing',
  'worthy',
  'brilliant',
  'awesome',
  'marvelous',
  'legit',
  'perfect'
]

export function getEncourageFeedback() {
  return encourageFeedback[randomIntInRange(0, encourageFeedback.length - 1)]
}

function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

