import * as React from "react";
import { Store } from "redux";
import { Route , Routes } from "react-router-dom";
import MainPage from "./components/MainPage.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";


const App = () => {
  const [isSigned, setIsSigned] = React.useState();
  const [user, setUser] = React.useState()

  return (
    //main page
      // navbar 
        // Hello User! 
        // login 
        // sign up
      // button - add listing
      // job listing (repeated)
        //form :
          //company name
          //position
          //pay 
          //date applied
          //stage 
          //delete button
    <Routes>
      <Route path="/"  element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App;


