import { useEffect, useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AddCardIcon from '@mui/icons-material/AddCard'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import CircularProgress from '@mui/material/CircularProgress'
import { getWordDefinition, partsOfSpeech, defaultRecallParams } from '../utils'
import { saveFlashcard } from '../modals/db'
import Alert from '@mui/material/Alert'

export default function FlashcardDrawer({ query, dispatch }) {
  const [state, setState] = useState({
    status: query ? 'pending' : 'idle',
    word: null,
    error: null,
  })

  useEffect(() => {
    if (query) {
      setState({ status: 'pending' })
      getWordDefinition(query)
        .then(word => {
          setState({ status: 'resolved', word })
        })
        .catch(error => {
          setState({ status: 'rejected', error })
        })
    }
  }, [query])

  const { status, word, error } = state

  if (status === 'idle') {
    return null
  } else if (status === 'pending') {
    return <Pending />
  } else if (status === 'resolved') {
    return <WordForm word={word} dispatch={dispatch} />
  } else if (status === 'rejected') {
    throw error
  }
}

function Pending() {
  return (
    <Box sx={{
      width: 250,
      m: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CircularProgress variant='indeterminate' size={32} />
    </Box>
  )
}

function WordForm({ word, dispatch }) {
  const [error, setError] = useState(null)
  const { keyword, partOfSpeech, phonetic, audio, translation } = word
  if (!partsOfSpeech.includes(partOfSpeech)) {
    partsOfSpeech.push(partOfSpeech)
  }

  const audioRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const flashcardData = {
      ...defaultRecallParams,
      keyword,
      audio,
      partOfSpeech: data.get('part-of-speech'),
      phonetic: data.get('phonetic'),
      translation: data.get('translate'),
    }

    saveFlashcard(flashcardData)
      .then(_ => {
        dispatch({ type: 'TOGGLE_SNACKBAR' })
        dispatch({ type: 'TOGGLE_DRAWER' })
      })
      .catch(error => {
        setError(error)
      })
  }

  function playAudio() {
    audioRef.current.play()
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 250,
        padding: 2,
      }}
    >
      <Stack direction='row' spacing={2} alignItems='center'>
        <Avatar>
          <AddCardIcon fontSize='small' />
        </Avatar>
        <Typography component='h1' variant='h5'>
          New Word
        </Typography>
      </Stack>
      <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name='word'
              required
              fullWidth
              disabled
              id='word'
              label='word'
              defaultValue={keyword}
              variant='standard'
              size='small'
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='standard' fullWidth>
              <InputLabel id='part-of-speech'>Part of speech</InputLabel>
              <Select
                name='part-of-speech'
                labelId='part-of-speech'
                id='part-of-speech-select'
                defaultValue={partOfSpeech}
                label='Part of speech'
                size='small'
              >
                {partsOfSpeech.map(value => (
                  <MenuItem key={value} value={value}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              id='phonetic'
              label='Phonetic'
              name='phonetic'
              defaultValue={phonetic}
              size='small'
              variant='standard'
            />
          </Grid>
          <Grid item xs={4}>
            <audio style={{ visibility: 'hidden' }} src={audio} ref={audioRef}></audio>
            <IconButton aria-label='play sound' size='large' onClick={playAudio}>
              <VolumeUpIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name='translate'
              label='Translate'
              type='text'
              id='translate'
              defaultValue={translation}
              size='small'
              variant='standard'
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Add New Word
        </Button>
      </Box>
      {error ? (<Box sx={{ width: 250 }}>
        <Alert severity='error'>{error.message}</Alert>
      </Box>) : null}
    </Box >
  )
}
