import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'

function DocumentCard(props) {
  const { id, title, textShort } = props.userDocument;
  return (
    <Link
      underline='none'
      sx={{ display: 'block', maxWidth: 275 }}
      data-testid="link-card"
      component={RouterLink}
      to={`/reading/${id}`}>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2">
              {textShort}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Link>
  )
}

DocumentCard.propTypes = {
  userDocument: PropTypes.shape({
    title: PropTypes.string.isRequired,
    textShort: PropTypes.string.isRequired,
  }).isRequired,
}

export default DocumentCard;
