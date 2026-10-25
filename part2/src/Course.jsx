const Header = ({course}) => {
  console.log("Header...", course)
  return <h1>{course.name}</h1> 
}

const Part = ({part}) => {
  console.log("Part...", part)
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}
const Content = ({parts}) => {
  console.log("Content...", parts)
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part}/>
      )}
    </div>
  )
}

const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p>
            <strong>Total of {total} exercises</strong>
        </p>
    )
}

const Course = ({course}) => {
  console.log("Course...", course)
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}
export default Course