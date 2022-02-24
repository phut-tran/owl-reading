import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewDocument from '../new-doc'
import { db } from '../../modals/db'
import { wait } from '@testing-library/user-event/dist/utils'

jest.mock('../../modals/db', () => {
  return {
    __esModule: true,
    db: {
      docsMetaData: {
        add: jest.fn(),
      },
      docsContent: {
        add: jest.fn(),
      },
      open: jest.fn(),
    },
  }
})


it('should render title input', () => {
  render(<NewDocument />)
  const titleInput = screen.getByLabelText('Title')
  expect(titleInput).toBeInTheDocument()
  expect(titleInput).toHaveAttribute('type', 'text')
})

it('update value on change event in the title input', () => {
  render(<NewDocument />)
  const titleInput = screen.getByLabelText('Title')
  fireEvent.change(titleInput, { target: { value: 'Test input title' } })
  expect(titleInput).toHaveAttribute('value', 'Test input title')
})

it('should render editor without crash', () => {
  render(<NewDocument />)
  const editor = screen.getByText('Add your favorite document here...')
  expect(editor).toBeInTheDocument()
})

it('should be able to type in the editor', () => {
  render(<NewDocument />)
  const editor = screen.getByText('Add your favorite document here...')
  fireEvent.blur(editor, { target: { textContent: 'Test content editable' } })
  expect(
    screen.getByText('Test content editable')
  ).toBeInTheDocument()
})

it('should render save button', () => {
  render(<NewDocument />)
  const saveButton = screen.getByLabelText(/save document/i)
  expect(saveButton).toBeInTheDocument()
})

it('should call saveDocument function on save button click', async () => {
  const mockDocsMeta = jest.spyOn(db.docsMetaData, 'add')
  const mockDocConent = jest.spyOn(db.docsContent, 'add')
  mockDocsMeta.mockResolvedValue(1)
  mockDocConent.mockResolvedValue(1)
  render(<NewDocument />)
  const saveButton = screen.getByLabelText(/save document/i)
  userEvent.click(saveButton)

  await wait(() => expect(mockDocsMeta).toHaveBeenCalled())
  await wait(() => expect(mockDocConent).toHaveBeenCalled())
})
