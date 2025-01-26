import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Welcome to Custom Wordle</h1>
      <p>Try to guess the hidden word/phrase! No guess limit—go for it!</p>
      <button onClick={() => navigate('/game')}>Play the Game</button>
      <button onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
      <button onClick={() => navigate('/congratulations')}>View Congratulations Page</button>
      <button onClick={() => navigate('/announcement')} className="primary">
        View Birth Announcement
      </button>
    </div>
  )
}