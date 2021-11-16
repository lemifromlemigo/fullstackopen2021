import React from "react"


const Course = ({ name, parts }) => {
  
    return (
      <div>
        <Header name={name}/>
        <Content parts={parts}/>
        <Total parts={parts}/>
      </div>
    )
  }
  
  
const Header = (props) => {
    console.log(props)
    const name = props.name
  
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  
const Content = (props) => {
    console.log(props)
    const parts = props.parts
  
    return (
      <div>
        {parts.map(({ name, exercises, id }) => (
          <ContentRow key={id} name={name} exercises={exercises}/>
        ))}
      </div>
    )
  }
  

const ContentRow = (props) => {
    console.log(props)
    const name = props.name
    const exercises = props.exercises
  
    return (
      <div>{name} {exercises}</div>
    )
  }
  
  
const Total = (props) => {
    console.log(props)
    const parts = props.parts
  
    const total_sum = parts.map(item => item.exercises).reduce((a, c) => a + c, 0);
  
    return (
      <div>
        <h3>Number of exercises {total_sum}</h3>
      </div>
    )
  }

  
export default Course