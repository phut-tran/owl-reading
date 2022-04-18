import { useEffect, useState } from 'react'
import MobileStepper from '@mui/material/MobileStepper'
import { getDueFlashcards } from '../modals/db'
import Box from '@mui/material/Box'
import RecallForm from '../common/recall-form'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function Recall() {
  const [activeStep, setActiveStep] = useState(0)
  const [cards, setCards] = useState([])
  const [isFinish, setIsFinish] = useState(false)
  const [load, setLoad] = useState('idle')

  useEffect(() => {
    setLoad('pending')
    getDueFlashcards()
      .then(cards => {
        setCards(cards)
        setLoad('resolved')
      })
      .catch(error => {
        console.log(error)
        setLoad('rejected')
      })

    if (isFinish) {
      setActiveStep(0)
      setIsFinish(false)
    }
  }, [isFinish])

  function increaseStep() {
    if (activeStep < cards.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      setIsFinish(true)
    }
  }

  if (load === 'idle') {
    return null
  } else if (load === 'pending') {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load === 'pending'}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  } else if (load === 'rejected') {
    return 'Somthing wrong'
  }

  return (
    <Box sx={{ maxWidth: '800px', m: 'auto' }}>
      {cards.length ?
        <Box>
          <MobileStepper
            variant='progress'
            steps={cards.length}
            position='static'
            activeStep={activeStep}
            sx={{
              justifyContent: 'center',
              m: '48px auto',
            }}
            LinearProgressProps={{
              sx: { width: '100%', height: 12, borderRadius: '5px' }
            }} />
          <RecallForm card={cards[activeStep]} increaseStep={increaseStep} />
        </Box> :
        (<Grid
          sx={{ width: '100%', height: '70vh' }}
          container
          justifyContent='center'
          alignItems='center'>
          <Alert severity='success'>
            <AlertTitle>Well done</AlertTitle>
            You've finish all the due cards today. {' '}
            <Link
              color='#444'
              component={RouterLink}
              to='/reading'
            >
              Read some more
            </Link>
          </Alert>
        </Grid>
        )}
    </Box>
  )
}
