import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Score {
  name: string
  guesses: number
}

export default function LeaderboardPage() {
  const [name, setName] = useState('')
  const [scores, setScores] = useState<Score[]>([])
  const [pendingGuesses, setPendingGuesses] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('scores')
    if (stored) setScores(JSON.parse(stored))

    const pendingScore = localStorage.getItem('pendingScore')
    if (pendingScore) {
      setPendingGuesses(Number(pendingScore))
      localStorage.removeItem('pendingScore')
    }
  }, [])

  function addScore() {
    const finalGuesses = pendingGuesses ?? 0
    const newScore = { name, guesses: finalGuesses }
    const updated = [...scores, newScore].sort((a, b) => a.guesses - b.guesses)
    setScores(updated)
    localStorage.setItem('scores', JSON.stringify(updated))
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <div>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        <button onClick={addScore}>Add Score</button>
      </div>
      <ul>
        {scores.map((item, i) => (
          <li key={i}>{item.name} - {item.guesses} guesses</li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Return to Landing</button>
    </div>
  )
}