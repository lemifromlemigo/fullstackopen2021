import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}


const Header = (props) => {
  console.log(props)
  const course_name = props.course.name

  return (
    <div>
      <h1>{course_name}</h1>
    </div>
  )
}


const Content = (props) => {
  console.log(props)
  const parts = props.parts

  return(
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises}/>
      <Part part={parts[1].name} exercises={parts[1].exercises}/>
      <Part part={parts[2].name} exercises={parts[2].exercises}/>
    </div>
  )
}


const Part = (props) => {
  console.log(props)
  const part_name = props.part
  const part_exercises = props.exercises

  return (
    <div>
      <p>{part_name} {part_exercises}</p>
    </div>
  )
}


const Total = (props) => {
  console.log(props)
  const parts = props.parts

  const total_sum = parts.map(item => item.exercises).reduce((a, c) => a + c, 0);

  return (
    <div>
      <p>Number of exercises {total_sum}</p>
    </div>
  )
}


export default App