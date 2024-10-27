import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import LoggedInPage from "./pages/LoggedInPage"
import LoggedOutPage from "./pages/LoggedOutPage"
import TodoList from "./components/todo-check/TodoList"
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/> } />
          <Route path="/login" element={<Login/> } />
          <Route path="/register" element={<Register />} />
          <Route path="/loggedin" element={<LoggedInPage />} />
          <Route path="/logged-out" element={<LoggedOutPage />} />
          <Route path="/todolist" element={<TodoList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
