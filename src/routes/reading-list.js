import Grid from '@mui/material/Grid'
import { getFilteredDocs } from '../modals/db'
import DocumentCard from '../common/document-card'
import { createContext, useEffect, useReducer, useState } from 'react'
import DeleteSnackbar from '../common/delete-snackbar'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import EditorDialog from '../common/edior-dialog'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'

export const ReadingListContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_DOC':
      return { ...state, isShowDialog: true, editDocId: null }
    case 'DELETE_DOC':
      const { deletedId } = action
      return { ...state, deletedId, isShowSnackbar: true }
    case 'EDIT_DOC':
      return { ...state, isShowDialog: true, editDocId: action.docId }
    case 'UNDO_DELETE_DOC':
      return { ...state, deletedId: null, isShowSnackbar: false }
    case 'TOGGLE_SNACKBAR':
      return { ...state, isShowSnackbar: !state.isShowSnackbar }
    case 'TOGGLE_DIALOG':
      return { ...state, isShowDialog: !state.isShowDialog }
    case 'SET_DOCS':
      const { userDocs } = action
      return { ...state, userDocs }
    default:
      throw new Error(`Unknow document action: ${action.type}`)
  }
}

const initState = {
  isShowDialog: false,
  isShowSnackbar: false,
  editDocId: null,
  deletedId: null,
  userDocs: [],
}

export function ReadingList() {
  const [status, setStatus] = useState('idle')
  const [state, dispatch] = useReducer(reducer, initState, () => {
    const settings = localStorage.getItem('owl-reading-settings')
    if (settings) {
      return { ...initState, nickname: JSON.parse(settings).nickname }
    } else {
      return initState
    }
  })

  const {
    isShowDialog,
    isShowSnackbar,
    editDocId,
    userDocs,
    nickname,
  } = state

  useEffect(() => {
    setStatus('pending')
    getFilteredDocs()
      .then(userDocs => {
        dispatch({ type: 'SET_DOCS', userDocs })
        setStatus('resolved')
      })
      .catch((error) => {
        console.log(error.message)
        setStatus('rejected')
      })

  }, [isShowDialog, isShowSnackbar])

  function addNewDoc() {
    dispatch({
      type: 'ADD_DOC'
    })
  }

  if (status === 'pending') {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    )
  } else if (status === 'rejected') {
    return (
      <Alert severity='error' sx={{ mt: 10, maxWidth: 450, mx: 'auto' }}>
        <AlertTitle>Something wrong</AlertTitle>
        There was a problem loading your documents.
      </Alert>
    )
  } else if (userDocs.length === 0) {
    return (
      <Alert severity='info' sx={{ mt: 10, maxWidth: 450, mx: 'auto' }}>
        <AlertTitle>Your reading list is empty</AlertTitle>
        <Button onClick={addNewDoc}>Add doc</Button>
        <EditorDialog docId={editDocId} open={isShowDialog} dispatch={dispatch} />
      </Alert>
    )
  }

  return (
    <ReadingListContext.Provider value={{ state }}>
      <Box>
        <Typography variant='h3' sx={{ marginBottom: 5, marginTop: 5 }}>
          Hi! {nickname}. Enjoy reading
        </Typography>

        <Grid container spacing={4}>
          {userDocs.map(doc => (
            <Grid key={doc.id} item xs>
              <DocumentCard
                userDocument={doc}
                dispatch={dispatch} />
            </Grid>
          ))}
        </Grid>

        <DeleteSnackbar
          open={isShowSnackbar}
          dispatch={dispatch} />

        <EditorDialog docId={editDocId} open={isShowDialog} dispatch={dispatch} />

        <Fab
          color='primary'
          aria-label='add'
          onClick={addNewDoc}
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </ReadingListContext.Provider>
  )
}
