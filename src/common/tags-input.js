import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { getAllTags } from '../modals/db'

function TagsInput({ tags, setTags }) {
  const [tagOptions, setTagOptions] = useState([])

  useEffect(() => {
    getAllTags()
      .then(tagsDB => { setTagOptions(tagsDB) })
      .catch(error => { console.log(error) })
  }, [])

  function handleTagsInputChange(_, value) {
    setTags(value)
  }

  return (
    <Autocomplete
      freeSolo
      multiple
      fullWidth
      value={tags}
      disableCloseOnSelect
      filterSelectedOptions
      options={tagOptions}
      onChange={handleTagsInputChange}
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
