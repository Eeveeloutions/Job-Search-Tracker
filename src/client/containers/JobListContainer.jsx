import React, { useEffect } from 'react';
import JobList from '../components/JobList.jsx';
import {connect} from 'react-redux'; //connect is for? 
import actions from '../features/actions';
import { MapStateToProps, MapDispatchToProps } from 'react-redux';
const axios = require("axios");


const mapStateToProps = store => {
   return {
    jobList: store.jobList, // the one with jobsreducer in between // yea still an error popped up
    totalJobs: store.totalJobs, 
   }
  };
  
const mapDispatchToProps = dispatch => ({
  createJob: (e) => {
    console.log(job)
    dispatch(actions.createJobThunk())
  },

  updateJob: (e, id, company, title, salary, applied, date, status) => {
    dispatch(actions.updateJobThunk(e.target.id, e.target)); //have to pull values from JobList.jsx
  },

  deleteJob: (e, id) => {
      console.log('deleteCard', e.target.id);
      dispatch(actions.deleteJobThunk(e.target.id));
  },
  

  fetchJobData: async () => { 
    try {
      let jobs = await axios.get('http://localhost:3000/jobs/getJobs');
      console.log('JOBS: ', jobs);
      // jobs.forEach((job) => dispatch(actions.createJob(job)))
      // dispatch(() => (actions.updateAllJobs(jobs)));
      // jobs.forEach((job) => dispatch(actions.updateAllJobs(job)))
      dispatch(actions.updateAllJobs(jobs.data))
    } 
    catch(err) {
      console.log('Error in fetchJobData:', err)
    }  
    // axios.get('http://localhost:3000/jobs/getJobs')
    // .then((jobs) => { //compatible with how we are receiving this from the backend?
    //   console.log('JOBS: ', jobs);
    //   dispatch(actions.updateAllJobs(jobs))
    // })
    // .catch(err => console.log('Error in fetchJobData:', err))
  }
});

const JobListContainer = props => {
  useEffect(() => { props.fetchJobData()}, []) 
  const jobs = [];
//referring to id correctly?
  console.log('jobList:', props.jobList);
  for (let i = 0; i < props.jobList.length; i++) {
    jobs.push(<JobList key={i} id={props.jobList[i].id} 
                       company={props.jobList[i].company} 
                       title={props.jobList[i].title} 
                       salary={props.jobList[i].salary} 
                       applied={props.jobList[i].applied} 
                       date={props.jobList[i].date} 
                       status={props.jobList[i].status} 
                       updateJob = {props.updateJob}
                       />)
  }

  return (
    <div>
      <button id='new-job' onClick={(e)=>{props.createJob()}}> Add New Job </button>
      {jobs}
       {/* <JobList/> */}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(JobListContainer);