import * as React from "react"
import { Route , Routes, BrowserRouter, Link } from "react-router-dom";
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'

const Navbar = () => {

  return (
    <div>
      NavBar
      <Link to='/login' > 
        <button>Login </button>
      </Link>
      <Link to='/signup' >
          <button>Sign Up</button>  
      </Link>
    </div>
  )
}

export default Navbar;