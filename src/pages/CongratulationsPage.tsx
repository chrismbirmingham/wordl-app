import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MiniGuessGrid from '../components/MiniGuessGrid'
import type { GuessFeedback, Score } from '../types'

export default function CongratulationsPage() {
  const navigate = useNavigate()
  const [guesses, setGuesses] = useState<GuessFeedback[]>([])
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('gameGuesses')
    if (stored) {
      setGuesses(JSON.parse(stored))
      // Optionally clear the storage
      localStorage.removeItem('gameGuesses')
    }
    const hints = localStorage.getItem('hintsUsed')
    if (hints) {
      setHintsUsed(Number(hints))
      localStorage.removeItem('hintsUsed')
    }
  }, [])

  function saveScore() {
    if (!name) return

    const stored = localStorage.getItem('scores')
    const scores: Score[] = stored ? JSON.parse(stored) : []
    
    const newScore: Score = {
      name,
      guesses: guesses.length,
      guessHistory: guesses,
      hintsUsed
    }
    
    const updated = [...scores, newScore].sort((a, b) => 
      (a.guesses + a.hintsUsed) - (b.guesses + b.hintsUsed)
    )
    localStorage.setItem('scores', JSON.stringify(updated))
    setSaved(true)
  }

  return (
    <div>
      <h2>Congratulations!</h2>
      <img src="/cats.jpg" alt="Congrats" width={390} height={255} />
      <p>You guessed the name! Look at how impressed these cats are with your performance.</p>
      <div>
        <p>Your guesses:</p>
        <MiniGuessGrid guesses={guesses} />
      </div>
      <p>Completed in {guesses.length} guesses {hintsUsed > 0 ? `(with ${hintsUsed} hints)` : ''}</p>
      {!saved ? (
        <div>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={saveScore}>Add to Leaderboard</button>
        </div>
      ) : (
        <p>Score saved! 🎉</p>
      )}
      <button onClick={() => navigate('/')}>Go to Landing Page</button>
      <button onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
    </div>
  )
}