import { render, screen, waitFor } from '@testing-library/react'
import TagsInput from '../tags-input'
import userEvent from '@testing-library/user-event'
import { getAllTags } from '../../modals/db'
import { useState } from 'react'

jest.mock('../../modals/db')

it('should render tags input', async () => {
  getAllTags.mockImplementation(() => Promise.resolve([]))

  render(<TagsInput tags={[]} />)
  const tagsInput = await waitFor(() => screen.findByLabelText('Tags'))
  expect(tagsInput).toBeInTheDocument()
})

it('should be able to create new tag', async () => {
  // ??? Why can't we move this line of code outside ???
  getAllTags.mockImplementation(() => Promise.resolve([]))

  render(<Wrapper />)
  const tagsInput = await waitFor(() => screen.findByLabelText('Tags'))
  userEvent.type(tagsInput, 'new tag')
  userEvent.keyboard('[Enter]')

  // Text box should be empty after adding the new tag.
  expect(tagsInput).toHaveValue('')
  // The new tag should be added to the tags array. i.e chip button.
  expect(screen.getAllByRole('button').length).toBe(1)
})

function Wrapper() {
  const [tags, setTags] = useState([])
  return (
    <div>
      <TagsInput tags={tags} setTags={setTags} />
    </div>
  )
}
