import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'

function AddDocButton() {
  return (
    <Link
      underline='none'
      sx={{ display: 'block', maxWidth: 275, border: '1px dashed #adadad' }}
      data-testid='link-card'
      component={RouterLink}
      to={'/reading/new'}>
      <Box>
        <Button startIcon={<AddIcon />}>
          New document
        </Button>
      </Box>
    </Link>
  )
}

export default AddDocButton
