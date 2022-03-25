import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

function AddDocButton({ dispatch }) {
  function handleButtonClick() {
    dispatch({
      type: 'ADD_DOC',
    })
  }

  return (
    <Box>
      <Button onClick={handleButtonClick} startIcon={<AddIcon />}>
        New document
      </Button>
    </Box>
  )
}

export default AddDocButton
