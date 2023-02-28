import * as React from "react";
import { RootState, AppDispatch } from "./store"; //what is this 
import { Store } from "redux";
import { Route , Routes } from "react-router-dom";
// import Navbar from './components/Navbar'
// import MainPage from './components/MainPage'
// import Routes from "./routes";


interface MainProps {
//   store: Store<RootState>;
//   history: History;
}

const App: React.FC<MainProps> = () => {
  return (
    // navbar 
      // Hello User! 
      // login 
      // sign up
    //main page
      // button - add listing
      // job listing (repeated)
        //form :
          //company name
          //position
          //pay 
          //date applied
          //stage 
          //delete button
    // < Navbar /> 
    // < MainPage />
    <div> 
      Hello World
    </div>
  )
}

export default App


