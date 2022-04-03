import { render, screen } from '@testing-library/react'
import DeleteSnacbar from '../delete-snackbar'

it('should render snackbar', () => {
  render(<DeleteSnacbar open={true} />)

  const messageElement = screen.getByText(/moved to trash/i)
  expect(messageElement).toBeInTheDocument()
})
