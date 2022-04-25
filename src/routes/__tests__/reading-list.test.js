import { render, screen, waitFor } from '@testing-library/react'
import { ReadingList } from '../reading-list'
import { MemoryRouter } from 'react-router-dom'
import { getFilteredDocs } from '../../modals/db'

const docs = [{
  id: 1,
  title: 'Test Title',
  isComplete: 0,
  created: new Date(),
  contentPreview: 'Test content preview',
  tags: ['sample-reading'],
  lastOpen: new Date(),
}]

jest.mock('../../modals/db')

beforeEach(() => {
  getFilteredDocs.mockImplementation(() => Promise.resolve(docs))
})

it('should render a greeting', async () => {
  render(<ReadingList />, { wrapper: MemoryRouter })
  const greeting = await waitFor(() => screen.findByText(/enjoy reading/i))
  expect(greeting).toBeInTheDocument()
})
