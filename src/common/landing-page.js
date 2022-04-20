import { forwardRef, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Link as RouterLink } from 'react-router-dom'
import Container from '@mui/material/Container'
import GitHubIcon from '@mui/icons-material/GitHub'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import Divider from '@mui/material/Divider'
import heroImage from '../images/hero-bg.svg'
import readingImg from '../images/reading.svg'
import saveImg from '../images/save-word.svg'
import remainderImg from '../images/remainder.svg'
import { useNavigate } from 'react-router-dom'
import { initDB } from '../modals/db'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const LinkBehavior = forwardRef((props, ref) => (
  <RouterLink ref={ref} to='/get-started' {...props} role={undefined} />
))

export default function LandingPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const settings = localStorage.getItem('owl-reading-settings')
    if (settings) {
      initDB()
        .catch((error) => { console.log(error) })
        .finally(() => {
          navigate('/reading')
        })
    }

    setLoading(false)
  }, [navigate])

  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }

  return (
    <Container>
      <Stack direction='row' justifyContent='space-between' sx={{ mt: 4 }}>
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Owl Reading</Typography>
        <Button variant='contained' component={LinkBehavior}>Get Started</Button>
      </Stack>
      <Grid container sx={{ mt: 15 }}>

        {/* Hero section */}
        <Grid item xs={12} md={6}>
          <Typography variant='h1' sx={{ fontSize: '3.2rem' }}>Learn English through reading.</Typography>
          <Typography paragraph sx={{ fontSize: '1.4rem' }}>Learn new vocabulary right inside the platform using the spaced-repetition technique.</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={heroImage} alt='hero' style={{ maxWidth: '100%' }} />
        </Grid>

        {/* Read section */}
        <Grid item xs={12} sx={{ mt: 20 }} container alignItems='center' justifyContent='center'>
          <Grid>
            <Typography textAlign='center' variant='h2' sx={{ fontSize: '2.8rem' }}>Read</Typography>
            <Typography paragraph textAlign='center' sx={{ fontSize: '1.2rem' }}>Read your favorite literature.</Typography>
          </Grid>
        </Grid>
        <Grid
          item xs={12}>
          <img src={readingImg} alt='Reading' style={{ maxWidth: '100%', display: 'block', margin: 'auto' }} />
        </Grid>


        {/* Save section */}
        <Grid item xs={12} sx={{ mt: 20 }} container alignItems='center' justifyContent='center'>
          <Grid>
            <Typography textAlign='center' variant='h2' sx={{ fontSize: '2.8rem' }}>Save</Typography>
            <Typography paragraph textAlign='center' sx={{ fontSize: '1.2rem' }}>Save any word you don't know to your wordlist.</Typography>
          </Grid>
        </Grid>
        <Grid
          item xs={12}>
          <img src={saveImg} alt='Reading' style={{ maxWidth: '100%', display: 'block', margin: 'auto' }} />
        </Grid>

        {/* Recall section */}
        <Grid item xs={12} sx={{ mt: 20 }} container alignItems='center' justifyContent='center'>
          <Grid>
            <Typography textAlign='center' variant='h2' sx={{ fontSize: '2.8rem' }}>Recall</Typography>
            <Typography paragraph textAlign='center' sx={{ fontSize: '1.2rem' }}>Recall your wordlist using the spaced-repetition technique.</Typography>
          </Grid>
        </Grid>
        <Grid
          item xs={12}>
          <img src={remainderImg} alt='Reading' style={{ maxWidth: '100%', display: 'block', margin: 'auto' }} />
        </Grid>

        {/* Call to action section */}
        <Grid item xs={12} container justifyContent='center' alignItems='center' sx={{ mt: 20 }}>
          <Stack>
            <Typography textAlign='center' variant='h3' sx={{ fontSize: '2.8rem' }}>Try it</Typography>
            <Typography textAlign='center' paragraph sx={{ fontSize: '1.1rem' }}>No sigin require.</Typography>
            <Button variant='contained' component={LinkBehavior}>Get Started</Button>
          </Stack>
        </Grid>
      </Grid>

      {/* Footer section */}
      <Box
        component='footer'
        sx={{
          mt: 20,
          mb: 3,
        }}
      >
        <Container maxWidth='sm'>
          <Stack
            alignItems='center'
            justifyContent='center'
            direction='row'
            divider={<Divider orientation='vertical' flexItem />}
            spacing={2}>
            <Button href='https://github.com/phut-tran/owl-reading' startIcon={<GitHubIcon />}>
              Source code
            </Button>
            <Button href='https://undraw.co/illustrations' startIcon={<DesignServicesIcon />}>
              Illustrations from Undraw
            </Button>
          </Stack>
        </Container>
      </Box>
    </Container >
  )
}
