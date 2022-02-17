import './App.css';
import ResponsiveAppBar from './common/navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import ReadingList from './routes/reading-list';
import Recall from './routes/recall';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path='reading-list' element={<ReadingList />} />
          <Route path='recall' element={<Recall />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>404 not found</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
