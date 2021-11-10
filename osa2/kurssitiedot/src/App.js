import React from 'react'
import Course from './components.js'


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
    {
      name: 'Testikurssi',
      id: 3,
      parts: [
        {
          name: 'Testitehtävät',
          exercises: 5,
          id: 1
        },
        {
          name: 'Testikokeet',
          exercises: 12,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(({ name, id, parts }) => (
        /* Import components from module components.js */
        <Course key={id} name={name} parts={parts}/>
      ))}
    </div>
  )
}


export default App