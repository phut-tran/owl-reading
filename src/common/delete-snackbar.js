import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Fragment } from 'react'

function DeleteSnackbar({ open, dispatch }) {

  function handleClose(event, reason) {
    if (reason === 'clickaway') { return }
    dispatch({ type: 'TOGGLE_SNACKBAR' })
  }

  const handleUndoDelete = () => {
    dispatch({
      type: 'UNDO_DELETE_DOC',
    })
  }

  const action = (
    <Fragment>
      <Button color='secondary' size='small' onClick={handleUndoDelete}>
        UNDO
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </Fragment>
  )

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message='Moved to trash'
      action={action}
    />
  )
}

export default DeleteSnackbar
