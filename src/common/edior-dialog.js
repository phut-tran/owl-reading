import { useState, useEffect, useRef, forwardRef } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import StyleControls from '../common/style-controls'
import { db } from '../modals/db'
import TagsInput from '../common/tags-input'
import { v4 as uuidv4 } from 'uuid'
import { extractString } from '../utils'
import { convertFromRaw } from 'draft-js'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

function EditorDialog({ docId, open, dispatch }) {
  const handleClose = () => {
    dispatch({
      type: 'TOGGLE_DIALOG'
    })
  }

  const editor = useRef(null)
  const [title, setTitle] = useState('')

  // Tags input from users.
  const [tags, setTags] = useState([])

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  )

  useEffect(() => {
    if (docId) {
      db.docsMetaData.get(docId)
        .then(docMeta => {
          setTags(docMeta.tags)
          setTitle(docMeta.title)
        })

      db.docsContent.get(docId)
        .then(docContent => {
          const content = convertFromRaw(docContent.content)
          const contentState = EditorState.createWithContent(content)
          setEditorState(contentState)
        })
    } else {
      setTags([])
      setTitle('')
      setEditorState(EditorState.createEmpty())
    }
  }, [docId])

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

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
    const plainText = editorState.getCurrentContent().getPlainText()
    const rowContent = convertToRaw(editorState.getCurrentContent())
    const id = docId || uuidv4()
    const docMeta = {
      id,
      title,
      isComplete: Number(false), // IndexedDB doesn't support indexed boolean.
      contentPreview: extractString(plainText, 30),
      tags,
    }

    if (docId) {
      await db.docsMetaData.put(docMeta)
    } else {
      await db.docsMetaData.put({ ...docMeta, created: new Date() })
    }

    await db.docsContent.put({ id, content: rowContent })
    handleClose()
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            {docId ? 'Edit Document' : 'New Document'}
          </Typography>
          <Button autoFocus color='inherit' onClick={saveDocument}>
            save
          </Button>
        </Toolbar>
      </AppBar>
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
        <TagsInput tags={tags} setTags={setTags} />
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
      </Box>
    </Dialog>
  )
}

export default EditorDialog
