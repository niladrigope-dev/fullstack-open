const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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
      },
  ]
  const Part = (props) => {
    return <p>{props.part} {props.exercise}</p>
    }
  const Header = (props) => {

    console.log(props)
    return <h1>{props.course}</h1>
  }

  const Content = (props) => {
    return( 
    <>
      <Part part = {parts[0].name} exercise = {parts[0].exercises}/>
      <Part part = {parts[1].name} exercise = {parts[1].exercises}/>
      <Part part = {parts[2].name} exercise = {parts[2].exercises}/>
    </>)
  }

  const Total = (props) => {
    return <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  }

  return (
    <div>
      <Header course = {course}/>
      <Content/>
      <Total 
      exercises1 = {parts[0].exercises}
      exercises2 = {parts[1].exercises}
      exercises3 = {parts[2].exercises}
      />
    </div>
  )
}

export default App
