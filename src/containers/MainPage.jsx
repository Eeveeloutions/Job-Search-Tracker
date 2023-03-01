import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import JobListContainer from './JobListContainer.jsx';
import TotalsDisplay from '../components/TotalsDisplay.jsx'


const mapStateToProps = store => ({ 
  totalApps:   store.jobs.totalApps, //jobs??????
});

const MainPage = () => {

  return(
    <div>
      <Navbar />
      <h1 id="header">Job-Search-Tracker</h1>
      <TotalsDisplay totalApps={this.props.totalApps}/>
      <JobListContainer />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);