import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CardFooter from '@mui/material/Card'
import { deleteDocument } from '../modals/db'
function DocumentCard({ userDocument, dispatch }) {
  const { id, title, contentPreview } = userDocument

  async function handleDeleteDoc() {
    const deletedId = await deleteDocument(id)
    dispatch({
      type: 'DELETE_DOC',
      deletedId,
    })
  }

  function handleEditDoc() {
    dispatch({
      type: 'EDIT_DOC',
      docId: id,
    })
  }

  return (
    <Card variant='outlined' sx={{ margin: 'auto', maxWidth: 345 }}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Link
          color='inherit'
          underline='none'
          sx={{ display: 'block' }}
          data-testid='link-card'
          component={RouterLink}
          to={`/reading/${id}`}>
          <Typography
            noWrap
            variant='h4'
            sx={{ fontSize: '1.25rem', fontWeight: 500, pb: 2, maxWidth: '80%' }}>
            {title}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              marginBottom: 0
            }}
          >
            {contentPreview}
          </Typography>
        </Link>
      </CardContent>
      <CardFooter>
        <CardActions disableSpacing>
          <IconButton onClick={handleEditDoc} aria-label='edit'>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteDoc} aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </CardFooter>
    </Card>
  )
}

DocumentCard.propTypes = {
  userDocument: PropTypes.shape({
    title: PropTypes.string.isRequired,
    contentPreview: PropTypes.string.isRequired,
  }).isRequired,
}

export default DocumentCard
