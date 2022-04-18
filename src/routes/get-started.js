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

export default function GetStarted() {
  function handleSubmit() {
    console.log('form submited')
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
      <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete='nickname'
              name='firstName'
              required
              fullWidth
              id='nickname'
              label='Nickname'
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id='country-select-demo'
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.label} ({option.code})
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Choose a country'
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
