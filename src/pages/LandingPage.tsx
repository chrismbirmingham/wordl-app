import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Breaking News! At long last - Chris and Libby's baby has arrived!!!</h1>
      <p>Before we share the details we wanted to offer you a chance to play a guessing game for points and glory on the baby's name.</p>
      <p>The game is optional, so if you want to just know everything click the announcement button below. But if you want to have some more fun play the baby name wordl and see just how good you are!</p>
      <button onClick={() => navigate('/game')}>Play the Game!</button>
      <button onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
      {/* <button onClick={() => navigate('/congratulations')}>View Congratulations Page</button> */}
      <button onClick={() => navigate('/announcement')} className="primary">
        Take me to the Announcement Page...
      </button>
    </div>
  )
}