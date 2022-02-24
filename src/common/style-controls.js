import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined'
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'

const MIX_TYPES = [
  { icon: <FormatBoldIcon />, style: 'BOLD' },
  { icon: <FormatItalicIcon />, style: 'ITALIC' },
  { icon: <FormatUnderlinedIcon />, style: 'UNDERLINE' },
  { icon: <LooksOneOutlinedIcon />, style: 'header-one' },
  { icon: <LooksTwoOutlinedIcon />, style: 'header-two' },
  { icon: <FormatQuoteIcon />, style: 'blockquote' },
  { icon: <FormatListBulletedIcon />, style: 'unordered-list-item' },
  { icon: <FormatListNumberedIcon />, style: 'ordered-list-item' },
]

function StyleControls(props) {
  const { editorState, onToggle } = props
  const selection = editorState.getSelection()
  const currentStyle = editorState.getCurrentInlineStyle()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <Grid
      container
      spacing={1}
      aria-label='text formatting'
      justifyContent='center'
      sx={{ m: '1rem auto', maxWidth: '100%' }}
    >
      {MIX_TYPES.map(type => (
        <Grid item key={type.style}>
          <IconButton
            onMouseDown={(e) => {
              e.preventDefault()
              onToggle(type.style)
            }}
            color={
              currentStyle.has(type.style) || type.style === blockType ? 'primary' : 'default'
            }
            key={type.style}
            aria-label={type.style}>
            {type.icon}
          </IconButton>
        </Grid>))}
    </Grid>
  )
}

export default StyleControls
