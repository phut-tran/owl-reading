import { render, screen } from '@testing-library/react'
import { getAllTags } from '../../modals/db'
import EditorDialog from '../edior-dialog'

jest.mock('../../modals/db')

it('should render the editor', async () => {
  getAllTags.mockImplementation(() => Promise.resolve([]))
  render(<EditorDialog open={true} />)
  const placeholder = await screen.findByText(/add your favorite/i)
  expect(placeholder).toBeInTheDocument()
})
