import * as React from "react";
import { Store } from "redux";
import { Route , Routes } from "react-router-dom";
import MainPage from "./containers/MainPage.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";


const App = () => {
 
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
        <div>
    <Routes>
      <Route path="/"  element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    </div>
  )
}

export default App;


