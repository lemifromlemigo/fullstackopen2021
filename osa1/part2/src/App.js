import React, { useState } from 'react'


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handle_good = () => setGood(good + 1)
  const handle_neutral = () => setNeutral(neutral + 1)
  const handle_bad = () => setBad(bad + 1)

  let satisfaction = [];
  for (let i = 0; i < good; i++) satisfaction.push(1)
  for (let i = 0; i < neutral; i++) satisfaction.push(0)
  for (let i = 0; i < bad; i++) satisfaction.push(-1)

  return (
    <div>
      <Feedback/>
      <Feedback_btn handleClick={handle_good} text='Good' />
      <Feedback_btn handleClick={handle_neutral} text='Neutral'/>
      <Feedback_btn handleClick={handle_bad} text='Bad'/>

      <Statistics satisfaction={satisfaction}/>

    </div>
  )
}


const Feedback_btn = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const Feedback = () => {
  return (
    <div>
      <h1>Give feedback:</h1>
    </div>
  )
}


const StatisticLine = ( {text, value} ) => {
  return (
    <tr>
      <th>{text}: </th>
      <th>{value}</th>
    </tr>
  )
}


const Statistics = ({ satisfaction }) => {
  const good = satisfaction.filter(x => x === 1).length
  const neutral = satisfaction.filter(x => x === 0).length
  const bad = satisfaction.filter(x => x === -1).length

  const total_feedbacks = satisfaction.length
  const average = satisfaction => satisfaction.reduce((a, c) => a + c, 0) / satisfaction.length;
  const positive = good / total_feedbacks

  if (satisfaction.length > 0) {
    return (
      <div>
        <h1>Statistics:</h1>
        <table>
          <StatisticLine text='Good' value={good}/>
          <StatisticLine text='Neutral' value={neutral}/>
          <StatisticLine text='Bad' value={bad}/>
          <StatisticLine text='All' value={total_feedbacks}/>
          <StatisticLine text='Average' value={average(satisfaction)}/>
          <StatisticLine text='Positive' value={positive}/>
        </table>
      </div>
    )
  }
  else {
    return (
      <div>
        <h3>No feedback given yet.</h3>
      </div>
    )
  }
}


export default App