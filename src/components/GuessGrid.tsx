import { GuessFeedback } from '../types'
import styles from './GuessGrid.module.css'

interface GuessGridProps {
  guesses: GuessFeedback[]
  targetLength: number
  maxGuesses?: number
}

export default function GuessGrid({ guesses, targetLength, maxGuesses = 6 }: GuessGridProps) {
  const emptyRows = Array(maxGuesses - guesses.length).fill(null)

  return (
    <div className={styles.grid}>
      {guesses.map((guess, i) => (
        <div key={i} className={styles.row}>
          {guess.guess.split('').map((char, j) => (
            <div
              key={j}
              className={`${styles.cell} ${styles[guess.feedback[j]]}`}
            >
              {char.toUpperCase()}
            </div>
          ))}
        </div>
      ))}
      {emptyRows.map((_, i) => (
        <div key={`empty-${i}`} className={styles.row}>
          {Array(targetLength).fill(null).map((_, j) => (
            <div key={j} className={styles.cell}></div>
          ))}
        </div>
      ))}
    </div>
  )
}
