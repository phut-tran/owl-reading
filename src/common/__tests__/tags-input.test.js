import { render, screen } from '@testing-library/react'
import TagsInput from '../tags-input'
import userEvent from '@testing-library/user-event'

it('should render tags input', () => {
  render(<TagsInput tags={['default', 'news', 'psychology']} />)
  const tagsInput = screen.getByLabelText('Tags')
  expect(tagsInput).toBeInTheDocument()
})

it('should be able to create new tag', () => {
  render(<TagsInput tags={['default', 'news', 'psychology']} />)
  const tagsInput = screen.getByLabelText('Tags')
  userEvent.type(tagsInput, 'new tag')
  userEvent.keyboard('[Enter]')

  // Confirm that the new tag is added to the tags array of the auto-complete input.
  // Text box should empty after adding the new tag.
  expect(tagsInput).toHaveValue('')
  // The new tag should be added to the tags array. i.e chip button.
  expect(screen.getAllByRole('button').length).toBe(1)
})
