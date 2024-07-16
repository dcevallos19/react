import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import Admin from "./components/admin/Admin"
import Main from "./components/layout/Main"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import './App.css'
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;