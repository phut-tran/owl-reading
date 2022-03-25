import AddDocButton from '../common/add-doc-button'
import Grid from '@mui/material/Grid'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../modals/db'
import DocumentCard from '../common/document-card'
import { useReducer } from 'react'
import DeleteSnackbar from '../common/delete-snackbar'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { v4 as uuidv4 } from 'uuid'
import EditorDialog from '../common/edior-dialog'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_DOC':
      return { ...state, isShowDialog: true, editDocId: null }
    case 'DELETE_DOC':
      const idInTrash = deleteDoc(action.docId)
      return { ...state, deletedId: idInTrash, isShowSnackbar: true, }
    case 'EDIT_DOC':
      return { ...state, isShowDialog: true, editDocId: action.docId }
    case 'UNDO_DELETE_DOC':
      restoreDoc(state.deletedId)
      return { ...state, deletedId: null }
    case 'TOGGLE_BACKDROP':
      return { ...state, isShowBackdrop: !state.isShowBackdrop }
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
  isShowBackdrop: true,
  isShowSnackbar: false,
  editDocId: null,
  idInTrash: null,
}

function deleteDoc(id) {
  let idInTrash = uuidv4()
  try {
    db.transaction(
      'rw',
      db.docsMetaData,
      db.docsContent,
      db.trash,
      async () => {
        db.trash.add({
          id: idInTrash,
          docsMeta: await db.docsMetaData.get(id),
          docsContent: await db.docsContent.get(id),
        })
        db.docsContent.where({ id }).delete()
        db.docsMetaData.delete(id)
      })
    return idInTrash
  } catch (e) {
    console.log(e)
  }
}

function restoreDoc(id) {
  db.transaction(
    'rw',
    db.trash,
    db.docsMetaData,
    db.docsContent,
    async () => {
      const restore = await db.trash.get(id)
      db.docsMetaData.add(restore.docsMeta)
      db.docsContent.add(restore.docsContent)
      db.trash.delete(restore.id)
    })
}


function ReadingList() {
  const [state, dispatch] = useReducer(reducer, initState)
  const { isShowBackdrop, isShowSnackbar, isShowDialog, editDocId } = state

  const userDocs = useLiveQuery(
    () => db.docsMetaData
      .where('isComplete').equals(0)
      .sortBy('lastOpen')
  )

  return (
    <div>
      <h1>Enjoy reading</h1>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        <Grid key={0} item xs={2} sm={4} md={4}>
          <AddDocButton dispatch={dispatch} />
        </Grid>
        {userDocs ? userDocs.map(doc => (
          <Grid key={doc.id} item xs={2} sm={4} md={4}>
            <DocumentCard
              userDocument={doc}
              dispatch={dispatch} />
          </Grid>
        )) : (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isShowBackdrop}
            onClick={() => dispatch({ type: 'TOGGLE_BACKDROP' })}>
            <CircularProgress color='inherit' />
          </Backdrop>
        )}
      </Grid>
      <DeleteSnackbar
        open={isShowSnackbar}
        dispatch={dispatch} />
      <EditorDialog docId={editDocId} open={isShowDialog} dispatch={dispatch} />
    </div>
  )
}

export default ReadingList
