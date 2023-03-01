import React, { useState } from 'react';
import { delApp, useApp } from '../features/jobListSlice';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar.jsx';

const JobList = () => {
  const dispatch = useDispatch();
  const { appList } = useSelector(state=>state);  

  return(
    <div id = 'id'>
      <label id = 'company' name = 'company'> Company:<input htmlFor='company' type = 'text'/> </label>
      <label id = 'title' name = 'title'> Title: <input htmlFor='title' type = 'text'/>  </label>
      <label id = 'salary' name = 'salary'>Salary: <input htmlFor='salary' type = 'text'/> </label>
      <label id = 'applied' name = 'title'> Applied? <input htmlFor='applied' type = 'checkbox'/> </label>
      <label id = 'date' name = 'date'> Date: <input htmlFor='date' type = 'date'/> </label>
      <label htmlFor= "status"> 
        <select id="status">
          <option value="wait">Waiting</option>
          <option value="behav">Behavioral</option>
          <option value="r1">Round 1</option>
          <option value="r2">Round 2</option>
          <option value="r3">Round 3</option>
          <option value="accept">Accepted</option>
          <option value="reject">Rejected</option>
          <option value="ghost">Ghosted</option>
        </select>
        </label>
    <button id='delete-job'> X </button>
    </div>
  )
}

export default JobList