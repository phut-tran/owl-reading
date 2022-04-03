import { render, screen, waitFor } from '@testing-library/react'
import Reading from '../reading'
import { getDocById } from '../../modals/db'
import {
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom'

const mockData = [
  {
    title: 'test title'
  },
  {
    content: {
      blocks: [
        {
          key: 'fqp81',
          text: 'test content',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },],
      entityMap: {},
    }
  }
]

jest.mock('../../modals/db')

beforeEach(() => {
  getDocById.mockImplementation(() => Promise.resolve(mockData))
})

it('should render document', async () => {
  render(
    <MemoryRouter initialEntries={['/reading/test-id']}>
      <Routes>
        <Route path='/reading/:docId' element={<Reading />} />
      </Routes>
    </MemoryRouter>
  )

  const title = await waitFor(() => screen.findByText(/test title/i))
  const content = await waitFor(() => screen.findByText(/test content/i))
  expect(title).toBeInTheDocument()
  expect(content).toBeInTheDocument()
})

