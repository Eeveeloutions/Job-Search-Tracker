import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import JobListContainer from './JobListContainer.jsx';
import TotalsDisplay from '../components/TotalsDisplay.jsx'
import { connect } from "react-redux";  // BW ADDED this to test

// const mapStateToProps = store => ({ 
//   totalJobs: store.jobsReducer.totalJobs, 
  
// });

// const mapDispatchToProps = (dispatch) => {  // ADDED to test
//   return {}
// }

const MainPage = props => {
  const theJobs = {};

  return(
    <div>
      <Navbar />
      <h1 id="header">Job-Search-Tracker</h1>
      {/* <TotalsDisplay totalApps={props.totalApps}/> */}
      <JobListContainer />
    </div>
  )
}

export default MainPage;