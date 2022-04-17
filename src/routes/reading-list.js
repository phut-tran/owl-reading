import Grid from '@mui/material/Grid'
import { getFilteredDocs, deleteDocument, restoreDocument } from '../modals/db'
import DocumentCard from '../common/document-card'
import { useEffect, useReducer, useState } from 'react'
import DeleteSnackbar from '../common/delete-snackbar'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import EditorDialog from '../common/edior-dialog'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_DOC':
      return { ...state, isShowDialog: true, editDocId: null }
    case 'DELETE_DOC':
      const idInTrash = deleteDocument(action.docId)
      return { ...state, deletedId: idInTrash, isShowSnackbar: true, }
    case 'EDIT_DOC':
      return { ...state, isShowDialog: true, editDocId: action.docId }
    case 'UNDO_DELETE_DOC':
      restoreDocument(state.deletedId)
      return { ...state, deletedId: null }
    case 'TOGGLE_SNACKBAR':
      return { ...state, isShowSnackbar: !state.isShowSnackbar }
    case 'TOGGLE_DIALOG':
      return { ...state, isShowDialog: !state.isShowDialog }
    default:
      throw new Error(`Unknow document action: ${action.type}`)
  }
}

const initState = {
  isShowDialog: false,
  isShowSnackbar: false,
  editDocId: null,
  idInTrash: null,
}

function ReadingList() {
  const [userDocs, setUserDocs] = useState([])
  const [state, dispatch] = useReducer(reducer, initState)
  const { isShowSnackbar, isShowDialog, editDocId } = state

  useEffect(() => {
    getFilteredDocs()
      .then(docs => { setUserDocs(docs) })
      .catch(error => { console.log(error) })
  }, [state])

  function addNewDoc() {
    dispatch({
      type: 'ADD_DOC'
    })
  }

  return (
    <Box>
      <Typography variant='h3' sx={{ marginBottom: 5, marginTop: 5 }}>
        Enjoy reading
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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!userDocs.length}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  )
}

export default ReadingList
