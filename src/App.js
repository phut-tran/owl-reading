import './App.css'
import ResponsiveAppBar from './common/navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Outlet />
    </div>
  )
}

export default App
