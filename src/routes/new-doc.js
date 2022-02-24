import { useRef } from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import { useState } from 'react'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import StyleControls from '../common/style-controls'
import Fab from '@mui/material/Fab'
import SaveIcon from '@mui/icons-material/Save'
import { db } from '../modals/db'

function NewDocument(props) {
  const editor = useRef(null)
  const [title, setTitle] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  )

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      setEditorState(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const toggleBlockInlineType = (style) => {
    const isInlineStyle = style === 'BOLD'
      || style === 'ITALIC'
      || style === 'UNDERLINE'
      || style === 'CODE'

    if (isInlineStyle) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, style))
    } else {
      setEditorState(RichUtils.toggleBlockType(editorState, style))
    }
  }

  async function saveDocument() {
    try {
      const plainText = editorState.getCurrentContent().getPlainText()
      const rowContent = convertToRaw(editorState.getCurrentContent())
      const contentId = await db.docsContent.add({ content: rowContent })

      await db.docsMetaData.add({
        title,
        isComplete: false,
        created: new Date(),
        docsContentId: contentId,
        contentPreview: extractString(plainText, 30),
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box>
      <InputBase
        fullWidth
        value={title}
        placeholder='Title...'
        inputProps={{ 'aria-label': 'Title' }}
        id='title'
        label='Title'
        sx={{ padding: '15px' }}
        onChange={handleTitleChange}
      />
      <Box
        sx={{ padding: '15px' }}>

        <StyleControls
          onToggle={toggleBlockInlineType}
          editorState={editorState} />

        <Box sx={{
          cursor: 'text',
          minHeight: '20rem'
        }}>
          <Editor
            handleKeyCommand={handleKeyCommand}
            placeholder='Add your favorite document here...'
            editorState={editorState}
            onChange={setEditorState}
            ref={editor} />
        </Box>
      </Box>
      <Fab sx={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
      }}
        onClick={saveDocument}
        color='primary'
        aria-label='save document'>
        <SaveIcon />
      </Fab>
    </Box>
  )
}

function extractString(string, numOfWords) {
  const words = string.split(' ')
  if (words.length > numOfWords) {
    return words.slice(0, numOfWords).join(' ')
  } else {
    return string
  }
}

export default NewDocument
