import { render, screen } from '@testing-library/react'
import DeleteSnacbar from '../delete-snackbar'
import { ReadingListContext } from '../../routes/reading-list'

jest.mock('../../modals/db', () => {
  return {
    restoreDocument: jest.fn(),
  }
})

it('should render snackbar', () => {
  render(
    <ReadingListContext.Provider value={{ state: { deletedId: 1 } }}>
      <DeleteSnacbar open={true} />
    </ReadingListContext.Provider>)

  const messageElement = screen.getByText(/moved to trash/i)
  expect(messageElement).toBeInTheDocument()
})
