import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./components/profile/Login"
import Register from "./components/profile/Register"
import TodoList from "./components/todo/TodoList"
import { Toaster } from "react-hot-toast"
import Profile from "./components/profile/Profile"
import ForgotPassword from "./components/profile/ForgotPassword"
import WhatsNew from "./pages/WhatsNew"

function App() {

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/> } />
          <Route path="/login" element={<Login/> } />
          <Route path="/register" element={<Register />} />
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/whats-new" element={<WhatsNew />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
