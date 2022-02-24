import StyleControls from '../style-controls'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditorState } from 'draft-js'

const buttons = [
  'BOLD', 'ITALIC', 'UNDERLINE',
  'header-one', 'header-two', 'blockquote', 'unordered-list-item', 'ordered-list-item']

const onToggle = jest.fn()
const TestTarget = () => (
  <StyleControls
    editorState={EditorState.createEmpty()}
    onToggle={onToggle} />
)

it('should render StyleControls without crash', () => {
  render(<TestTarget />)
})

buttons.forEach(button => {
  it(`should call onToggle on ${button} button click`, () => {
    render(<TestTarget />)

    userEvent.click(screen.getByLabelText(button))
    expect(onToggle).toHaveBeenCalledWith(button)
  })
})
