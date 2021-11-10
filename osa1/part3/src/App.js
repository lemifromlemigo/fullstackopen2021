import React, { useState } from 'react'

const points = [0, 0, 0, 0, 0, 0, 0]
let anecdote_most_voted = 0

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [maxVoted, setMaxVoted] = useState(0)

  const handleNext = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random)
  }

  const handleVote = () => {
    points[selected] += 1

    anecdote_most_voted = points.indexOf(Math.max.apply(null, points))
    setMaxVoted(anecdote_most_voted)

    console.log(points, anecdote_most_voted)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <span>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNext}>Next</button>
      </span>
      <br></br>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maxVoted]}</p>
    </div>
  )
}

export default App