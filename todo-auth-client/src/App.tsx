import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import LoggedInPage from "./pages/LoggedInPage"
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/> } />
          <Route path="/login" element={<Login/> } />
          <Route path="/register" element={<Register />} />
          <Route path="/loggedin" element={<LoggedInPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
