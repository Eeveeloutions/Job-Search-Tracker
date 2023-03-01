import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import JobList from './JobList.jsx';

const MainPage = () => {

  return(
    <div>
      <Navbar />
      <button id='new-job'> Add New Job </button>
      <JobList />
    </div>
  )
}

export default MainPage;
