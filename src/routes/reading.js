import { useEffect, useState, useRef, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getDocById } from '../modals/db'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { useTextSelection } from '../hooks/use-text-selection'
import Drawer from '@mui/material/Drawer'
import FlashcardDrawer from '../common/flashcard-drawer'
import { ErrorBoundary } from 'react-error-boundary'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_SNACKBAR':
      return { ...state, isShowSnackbar: !state.isShowSnackbar }
    case 'TOGGLE_DRAWER':
      return { ...state, isShowDrawer: !state.isShowDrawer }
    default:
      throw new Error(`Unknow reading action: ${action.type}`)
  }
}

const initialState = {
  isShowSnackbar: false,
  isShowDrawer: false,
}

export default function Reading() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isShowSnackbar, isShowDrawer } = state
  const { docId } = useParams()
  const editor = useRef(null)
  const [text, setText] = useTextSelection()

  const [title, setTitle] = useState('')
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  )

  function handleCloseDrawer() {
    dispatch({ type: 'TOGGLE_DRAWER' })
    setText('')
  }

  function handleCloseSnackbar() {
    dispatch({ type: 'TOGGLE_SNACKBAR' })
  }

  // TODO: Handle undefined doc
  useEffect(() => {
    if (docId) {
      getDocById(docId)
        .then(doc => {
          const [docMeta, docContent] = doc
          const content = convertFromRaw(docContent.content)
          const contentState = EditorState.createWithContent(content)
          setTitle(docMeta.title)
          setEditorState(contentState)
        })
        .catch(error => { console.log(error) })
    }
  }, [docId])

  useEffect(() => {
    if (text) {
      dispatch({ type: 'TOGGLE_DRAWER' })
    }
  }, [text, dispatch])

  return (
    <Box sx={{ maxWidth: '560px', margin: 'auto' }}>
      <Typography variant='h1' sx={{ fontSize: 28, mt: 6, mb: 6 }}>{title}</Typography>
      <Editor
        readOnly
        editorState={editorState}
        ref={editor} />
      <Drawer
        anchor='right'
        open={isShowDrawer}
        onClose={handleCloseDrawer}
      >
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          resetKeys={[text]}>
          <FlashcardDrawer dispatch={dispatch} query={text} />
        </ErrorBoundary>
      </Drawer>
      <Snackbar open={isShowSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
          New word was added
        </Alert>
      </Snackbar>
    </Box>
  )
}

// TODO: More specific error message.
function ErrorFallback() {
  return (
    <Box sx={{ width: 250 }}>
      <Alert severity='error'>Error</Alert>
    </Box>
  )
}
