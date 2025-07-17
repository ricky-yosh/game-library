import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import GamePage from './pages/GamePage/GamePage' // Make sure to import this

const base = import.meta.env.BASE_URL;

function App() {
  return (
    <Router basename={base}>
      <header className="header tiled-background">
        <Link className='website-title' to="/">
          <h1 className='website-banner'>Game Library</h1>
        </Link>
      </header>
      <div className='content'>
        <main className='page'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games/:gameId" element={<GamePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App