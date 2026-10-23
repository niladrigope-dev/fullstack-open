import { useState } from 'react'

const Statistics = ({good,neutral,bad,all,average,positive}) => {

  if (all === 0) {
    return <p>No feedback Given</p>
  }
  return(
    <div>
      <p>good:{good}</p>
      <p>neutral:{neutral}</p>
      <p>bad:{bad}</p>
      <p>all:{all}</p>
      <p>average:{average}</p>
      <p>positive:{positive}%</p>
    </div>
  )
}
const Button = ({onClick,text}) => {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}
const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = (newValue) => {
    console.log("new value good:", newValue)
    setGood(newValue)
  }
  const handleNeutralClick = (newValue) => {
    console.log("new value Neutral:", newValue)
    setNeutral(newValue)
  }
  const handleBadClick = (newValue) => {
    console.log("new value Bad:", newValue)
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {() => handleGoodClick(good + 1)} text = "good"/>
      <Button onClick = {() => handleNeutralClick(neutral + 1)} text = "neutral"/>
      <Button onClick = {() => handleBadClick(bad + 1)} text = "bad"/>

      <h1>statistics</h1>
      <Statistics
        good = {good}
        neutral = {neutral}
        bad = {bad}
        all = {good + neutral + bad }
        average = {(good*1 + bad*(-1))/(good + neutral + bad)}
        positive = {good * (100/(good + neutral + bad))}
      />
    </div>
  )
}

export default App