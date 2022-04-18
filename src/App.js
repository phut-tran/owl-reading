import './App.css'
import ResponsiveAppBar from './common/navbar'
import { Outlet } from 'react-router-dom'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { initDB, checkDatabase } from './modals/db'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { useNavigate } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate()
  const [loadStatus, setLoadStatus] = useState('idle')

  useEffect(() => {
    setLoadStatus('pending')
    checkDatabase()
      .then(checkDBCallback)
      .catch(() => setLoadStatus('rejected'))
      .finally(() => setLoadStatus('resolved'))

    function checkDBCallback(isExists) {
      if (isExists) {
        initDB()
        navigate('/reading')
      } else {
        navigate('/get-started')
      }
    }
  }, [navigate])

  let status
  if (loadStatus === 'idle') {
    status = null
  } else if (loadStatus === 'pending') {
    status = <ShowBackdrop />
  } else if (loadStatus === 'rejected') {
    status = <ShowAlert />
  }

  return (<>
    <ResponsiveAppBar />
    <Container maxWidth='xl'>
      {status}
      <Outlet />
    </Container>
  </>)
}

function ShowBackdrop() {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

function ShowAlert() {
  return (
    <Alert severity='error'>
      <AlertTitle>Error</AlertTitle>
      Something broken.
    </Alert>
  )
}
