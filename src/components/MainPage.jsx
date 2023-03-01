import React, { useState } from 'react';
import { addApp } from '../features/jobListSlice';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar.jsx';
import JobList from './JobList.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const { appList } = useSelector(state=>state);  

  return(
    <div>
      <Navbar />
      <button id='new-job' onClick={()=>dispatch(addApp())}> Add New Job </button>
      <JobList />
    </div>
  )
}

export default MainPage