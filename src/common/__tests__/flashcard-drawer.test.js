import { render, screen } from '@testing-library/react'
import FlashcardDrawer from '../flashcard-drawer'
import { getWordDefinition } from '../../utils'

const mockData = {
  keyword: 'hello',
  partOfSpeech: 'noun',
  phonetic: '/həˈləʊ/',
  audio: 'url',
  translate: 'target language'
}

jest.mock('../../utils')

beforeEach(() => {
  getWordDefinition.mockImplementation(() => Promise.resolve(mockData))
})

it('should render flashcard drawer', async () => {
  render(<FlashcardDrawer query='testing' />)

  const header = await screen.findAllByText(/new word/i)
  expect(header.length).toBe(2) // One in the heading, other in the submit button
})
