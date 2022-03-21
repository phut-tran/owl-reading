import { render, screen } from '@testing-library/react'
import ReadingList from '../reading-list'
import { MemoryRouter } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'

jest.mock('dexie-react-hooks')

it('should render a greeting', () => {
  const docs = [{
    id: 1,
    title: 'Test Title',
    isComplete: 0,
    created: new Date(),
    contentPreview: 'Test content preview',
    tags: ['sample-reading'],
    lastOpen: new Date(),
  }]

  useLiveQuery.mockReturnValue(docs)
  render(<ReadingList />, { wrapper: MemoryRouter })
  const greeting = screen.getByText(/enjoy reading/i)
  expect(greeting).toBeInTheDocument()
})
