import { GuessFeedback } from '../types'
import styles from './MiniGuessGrid.module.css'

interface MiniGuessGridProps {
  guesses: GuessFeedback[]
}

export default function MiniGuessGrid({ guesses }: MiniGuessGridProps) {
  return (
    <div className={styles.grid}>
      {guesses.map((guess, i) => (
        <div key={i} className={styles.row}>
          {guess.feedback.map((feedback, j) => (
            <div
              key={j}
              className={`${styles.cell} ${styles[feedback]}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
