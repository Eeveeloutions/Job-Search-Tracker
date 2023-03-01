import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar.jsx';

const JobList = props => {

  return(
    <div id = {props.id}>
      <label id = 'company' name = 'company'> Company:
        <input htmlFor='company' type = 'text' value ={props.company} onBlur={(e) => props.updateJob(props.id, e.target.name, e.target.value)}/> 
      </label>
      <label id = 'title' name = 'title'> Title: 
        <input htmlFor='title' type = 'text' value={props.title} onBlur={(e) => props.updateJob(props.id, e.target.name, e.target.value)} />  
      </label>
      <label id = 'salary' name = 'salary'>Salary: 
        <input htmlFor='salary' type = 'text' value={props.salary} onBlur={(e) => props.updateJob(props.id, e.target.name, e.target.value)}/> 
      </label>
      <label id = 'applied' name = 'applied'> Applied? 
         <input htmlFor='applied' type = 'checkbox' value={props.applied} onChange={(e) => {(e.target.value === 'unchecked') ? props.updateJob(props.id, e.target.name, 'false') : props.updateJob(props.id, e.target.name, 'true')}}/>
      </label>
      <label id = 'date' name = 'date'> Date: 
         <input htmlFor='date' type = 'date'  value={props.date} onChange={(e) => props.updateJob(props.id, e.target.name, e.target.value)}/> 
      </label>
      <label htmlFor= "status"> 
        <select id="status"  value={props.status} onChange={(e) => props.updateJob(props.id, e.target.name, e.target.value)} >
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
    <button id='delete-job' onClick={(e)=>{props.deleteJob(e.target.id)}}> X </button>
    </div>
  )
}

export default JobList