import './App.css'
import ResponsiveAppBar from './common/navbar'
import { Outlet } from 'react-router-dom'
import Container from '@mui/material/Container'

export default function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth='xl'>
        <Outlet />
      </Container>
    </>
  )
}

