import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import GamePage from './pages/GamePage'
import CongratulationsPage from './pages/CongratulationsPage'
import LeaderboardPage from './pages/LeaderboardPage'
import AnnouncementPage from './pages/AnnouncementPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/congratulations" element={<CongratulationsPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/announcement" element={<AnnouncementPage />} />
    </Routes>
  )
}

export default App
