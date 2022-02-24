import './App.css'
import ResponsiveAppBar from './common/navbar'
import { Routes, Route } from 'react-router-dom'
import ReadingList from './routes/reading-list'
import Recall from './routes/recall'
import NewDoc from './routes/new-doc'

function App() {
  return (
    <div className='App'>
      <ResponsiveAppBar />
      <Routes>
        <Route path='reading-list' element={<ReadingList />} />
        <Route path='recall' element={<Recall />} />
        <Route path='reading/new' element={<NewDoc />} />
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>404 not found</p>
            </main>
          }
        />
      </Routes>
    </div>
  )
}

export default App
