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
import { useLiveQuery } from 'dexie-react-hooks'
import { v4 as uuidv4 } from 'uuid'
import { extractString } from '../utils'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

function NewDocDialog({ open, dispatch }) {
  const handleClose = () => {
    dispatch({
      type: 'TOGGLE_ADD_DOC_DIALOG'
    })
  }

  const tagsDB = useLiveQuery(
    () => db.docsMetaData
      .orderBy('tags')
      .uniqueKeys()
  )

  const editor = useRef(null)
  const [title, setTitle] = useState('')

  // Tags input from users.
  const [tags, setTags] = useState([])

  // All tags from database for auto-complete.
  const [tagOptions, setTagOptions] = useState([])

  useEffect(() => {
    if (tagsDB) {
      setTagOptions(tagsDB)
    }
  }, [tagsDB])

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleTagsInputchange = (event, value) => {
    setTags(value)
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
      const docsId = uuidv4()
      await db.docsContent.add({ id: docsId, content: rowContent })

      await db.docsMetaData.add({
        id: docsId,
        title,
        isComplete: Number(false), // IndexedDB doesn't support indexed boolean.
        created: new Date(),
        contentPreview: extractString(plainText, 30),
        tags,
      })

      handleClose()
    } catch (e) {
      console.log(e)
    }
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
            New Document
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
        <TagsInput tags={tagOptions} handleTagsInput={handleTagsInputchange} />
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

export default NewDocDialog
