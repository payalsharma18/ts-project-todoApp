import AddTodo from "./components/AddTodo"
import AllTodos from "./components/AllTodos"
import Navbar from "./components/Navbar"
import './App.css'
const App = () => {
  return (
    <main>
      <h2>My Todo App</h2>
      <Navbar></Navbar>
      <AddTodo></AddTodo>
      <AllTodos></AllTodos>
    </main>
  )
}

export default App