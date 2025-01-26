import { GuessFeedback } from '../types'
import styles from './Keyboard.module.css'

const KEYBOARD_ROWS = [
  'QWERTYUIOP'.split(''),
  'ASDFGHJKL'.split(''),
  'ZXCVBNM'.split('')
]

interface KeyboardProps {
  guesses: GuessFeedback[]
  onKeyPress: (key: string) => void
}

export default function Keyboard({ guesses, onKeyPress }: KeyboardProps) {
  const getKeyState = (key: string): string => {
    let state = ''
    guesses.forEach(guess => {
      guess.guess.split('').forEach((char, i) => {
        if (char.toUpperCase() === key) {
          state = guess.feedback[i]
        }
      })
    })
    return state
  }

  return (
    <div className={styles.keyboard}>
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map(key => (
            <button
              key={key}
              className={`${styles.key} ${styles[getKeyState(key)]}`}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className={styles.row}>
        <button 
          className={`${styles.key} ${styles.wide}`}
          onClick={() => onKeyPress('ENTER')}
        >
          ENTER
        </button>
        <button 
          className={`${styles.key} ${styles.wide}`}
          onClick={() => onKeyPress('BACKSPACE')}
        >
          ←
        </button>
      </div>
    </div>
  )
}
