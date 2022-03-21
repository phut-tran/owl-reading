import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddDocButton from '../add-doc-button'

it('should render add new document button', function () {
  render(<AddDocButton />)
  const addDocElement = screen.getByText('New document')
  expect(addDocElement).toBeInTheDocument()
})

it('should have add icon in the button', function () {
  render(<AddDocButton />)

  const addIcon = screen.getByTestId('AddIcon')
  expect(addIcon).toBeInTheDocument()
})

it('should call dispatch function', function () {
  const dispatch = jest.fn()
  render(
    <AddDocButton dispatch={dispatch} />
  )

  const linkElement = screen.getByText('New document')
  userEvent.click(linkElement)
  expect(dispatch).toBeCalled()
})
