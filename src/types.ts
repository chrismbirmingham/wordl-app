export type GuessFeedback = {
  guess: string
  feedback: string[] // 'green' | 'yellow' | 'gray'
}

export interface Score {
  name: string
  guesses: number
  guessHistory: GuessFeedback[]
  hintsUsed: number  // Add this new field
}
