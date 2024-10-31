import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import LoggedInPage from "./pages/LoggedInPage"
import LoggedOutPage from "./pages/LoggedOutPage"
import TodoList from "./components/todo/TodoList"
import { Toaster } from "react-hot-toast"
import Profile from "./components/profile/Profile"

function App() {

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/> } />
          <Route path="/login" element={<Login/> } />
          <Route path="/register" element={<Register />} />
          <Route path="/loggedin" element={<LoggedInPage />} />
          <Route path="/logged-out" element={<LoggedOutPage />} />
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
