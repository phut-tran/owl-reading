import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
function DocumentCard({ userDocument, dispatch }) {
  const { id, title, contentPreview } = userDocument

  function handleDeleteDoc() {
    dispatch({
      type: 'DELETE_DOC',
      docId: id,
    })
  }

  return (
    <Box>
      <Card variant='outlined'>
        <Link
          color='inherit'
          underline='none'
          sx={{ display: 'block' }}
          data-testid='link-card'
          component={RouterLink}
          to={`/reading/${id}`}>
          <CardContent>
            <Typography noWrap variant='h6' gutterBottom>
              {title}
            </Typography>
            <Typography variant='body2'>
              {contentPreview}
            </Typography>
          </CardContent>
        </Link>
        <CardActions disableSpacing>
          <IconButton aria-label='edit'>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteDoc} aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  )
}

DocumentCard.propTypes = {
  userDocument: PropTypes.shape({
    title: PropTypes.string.isRequired,
    contentPreview: PropTypes.string.isRequired,
  }).isRequired,
}

export default DocumentCard
