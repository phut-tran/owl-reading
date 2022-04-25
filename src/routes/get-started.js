import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import Autocomplete from '@mui/material/Autocomplete'
import countries from '../modals/iso-lang.json'
import { useNavigate } from 'react-router-dom'

export default function GetStarted() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const nickname = data.get('nickname')
    const langCode = data.get('native-language').split('-')[1]
    window.localStorage.setItem('owl-reading-settings', JSON.stringify({ nickname, langCode }))
    navigate('/reading')
  }

  return (
    <Grid
      container
      justifyContent='center'
      maxWidth={480}
      sx={{ mx: 'auto', mt: 15 }}>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AppRegistrationIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Get Started
        </Typography>
      </Stack>
      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete='nickname'
              name='nickname'
              required
              fullWidth
              id='nickname'
              label='Nickname'
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id='native-language'
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label + '-' + option.code}
              renderOption={(props, option) => (
                <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.label} ({option.code})
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label='Choose your native language'
                  name='native-language'
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>
      </Box>
    </Grid >
  )
}
