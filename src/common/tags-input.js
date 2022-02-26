import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'

function TagsInput(props) {
  const { tags, handleTagsInput } = props
  return (
    <Autocomplete
      freeSolo
      multiple
      fullWidth
      options={tags}
      onChange={handleTagsInput}
      id='tags'
      label='Tags'
      sx={{ padding: '15px' }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant='outlined' label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant='standard'
          label='Tags'
          placeholder='Tags'
        />
      )}
    />)
}

export default TagsInput
