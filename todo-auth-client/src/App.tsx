import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import LoggedInPage from "./pages/LoggedInPage"
import LoggedOutPage from "./pages/LoggedOutPage"
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
        </Routes>
      </Router>
    </>
  )
}

export default App
