import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GuessGrid from '../components/GuessGrid'
import Keyboard from '../components/Keyboard'
import type { GuessFeedback } from '../types'

const TARGET = 'You Wish You Knew' // Hardcoded target

const hints = [
    "The last name is Birmingham",
    "Young is the second middle name",
    "They are all family names",
    "EGYB are the initials",
    "There are two 't's",
    "There are three 'i's",
    "There are two 'l's",
]

export default function GamePage() {
  const [guess, setGuess] = useState('')
  const [guesses, setGuesses] = useState<GuessFeedback[]>([])
  const [hintsShown, setHintsShown] = useState<number>(0)
  const [currentHint, setCurrentHint] = useState<string>('')
  const navigate = useNavigate()

  function getFeedback(guessStr: string, targetStr: string) {
    const feedbackArr: string[] = Array(guessStr.length).fill('gray')
    // Mark greens
    for (let i = 0; i < guessStr.length; i++) {
      if (guessStr[i].toLowerCase() === targetStr[i].toLowerCase()) {
        feedbackArr[i] = 'green'
      }
    }
    // Mark yellows
    for (let i = 0; i < guessStr.length; i++) {
      if (feedbackArr[i] !== 'green') {
        const matchIndex = targetStr
          .toLowerCase()
          .indexOf(guessStr[i].toLowerCase())
        if (matchIndex !== -1 && guessStr[i].toLowerCase() !== targetStr[i].toLowerCase()) {
          feedbackArr[i] = 'yellow'
        }
      }
    }
    return feedbackArr
  }

  function handleKey(key: string) {
    if (key === 'ENTER') {
      handleGuess()
    } else if (key === 'BACKSPACE') {
      setGuess(prev => prev.slice(0, -1))
    } else if (guess.length < TARGET.length && /^[A-Z]$/.test(key)) {
      setGuess(prev => (prev + key).slice(0, TARGET.length))
    }
  }

  // Update input handler to enforce length constraint
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.toUpperCase()
    if (newValue.length <= TARGET.length) {
      setGuess(newValue)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault() // Prevent form submission if within a form
      handleGuess()
    }
  }

  function showNextHint() {
    if (hintsShown < hints.length) {
      setCurrentHint(hints[hintsShown])
      setHintsShown(prev => prev + 1)
    }
  }

  function handleGuess() {
    if (guess.length !== TARGET.length) {
      alert(`Please enter a word/phrase of length ${TARGET.length}`)
      return
    }
    const newFeedback = getFeedback(guess, TARGET)
    const newGuessObj = { guess, feedback: newFeedback }
    setGuesses([...guesses, newGuessObj])
    if (guess.toLowerCase() === TARGET.toLowerCase()) {
      localStorage.setItem('pendingScore', String(guesses.length + 1))
      localStorage.setItem('gameGuesses', JSON.stringify([...guesses, newGuessObj]))
      localStorage.setItem('hintsUsed', String(hintsShown))
      navigate('/congratulations')
    }
    setGuess('')
  }

  return (
    <div>
      <h2>Wordle Game</h2>
      <p>Guesses taken: {guesses.length}</p>
      <p>Hints used: {hintsShown}</p>
      {currentHint && <p>Current hint: {currentHint}</p>}
      <button onClick={showNextHint} disabled={hintsShown >= hints.length}>
        {hintsShown >= hints.length ? 'No more hints!' : 'Give Me A Hint'}
      </button>
      <GuessGrid
        guesses={guesses}
        targetLength={TARGET.length}
        maxGuesses={guesses.length + 1}
      />
      <p>Characters: {guess.length} / {TARGET.length}</p>
      <input
        value={guess}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        maxLength={TARGET.length}
        placeholder={`Type exactly ${TARGET.length} characters`}
        style={{ 
          width: `${TARGET.length * 1.2}ch`,
          minWidth: '200px',
          textAlign: 'center'
        }}
      />
      <Keyboard
        guesses={guesses}
        onKeyPress={handleKey}
      />
    </div>
  )
}