import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { ReadingList } from './routes/reading-list'
import Recall from './routes/recall'
import Reading from './routes/reading'
import 'babel-polyfill'
import GetStarted from './routes/get-started'
import LandingPage from './common/landing-page'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter basename='owl-reading'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/*' element={<App />}>
          <Route path='get-started' element={<GetStarted />} />
          <Route path='reading' element={<ReadingList />} />
          <Route path='reading/:docId' element={<Reading />} />
          <Route path='recall' element={<Recall />} />
          <Route
            path='*'
            element={
              <main style={{ padding: '1rem' }}>
                <p>404 not found</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
