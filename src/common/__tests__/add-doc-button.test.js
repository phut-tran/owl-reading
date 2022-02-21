import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddDocButton from '../add-doc-button'
import { Router, MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'

it('should render add new document button', function () {
  render(<AddDocButton />, { wrapper: MemoryRouter })
  const addDocElement = screen.getByText('New document')
  expect(addDocElement).toBeInTheDocument()
})

it('should have add icon in the button', function () {
  render(<AddDocButton />, { wrapper: MemoryRouter })

  const addIcon = screen.getByTestId('AddIcon')
  expect(addIcon).toBeInTheDocument()
})

it('should navigate to add new document page when button click', function () {
  const history = createMemoryHistory({
    initialEntries: ['/reading-list'],
  })
  render(
    <Router location={history.location} navigator={history}>
      <AddDocButton />
    </Router>
  )

  const linkElement = screen.getByText('New document')
  userEvent.click(linkElement)
  expect(history.location.pathname).toBe('/reading/new')
})
