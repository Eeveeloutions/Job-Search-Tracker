import React, { useEffect } from 'react';
import JobList from '../components/JobList.jsx';
import {connect} from 'react-redux'; //connect is for? 
import actions from '../features/actions';



const mapStateToProps = store => ({
    appList: store.jobs.appList,
    totalApps: store.jobs.totalApps, //jobs????
  });
  
  const mapDispatchToProps = dispatch => ({
    createJob: (e) => {
      dispatch(actions.createJobThunk())
    },
  
    updateJob: (e, id, company, title, salary, applied, date, status) => {
      dispatch(actions.updateJobThunk(e.target.id, e.target)); //have to pull values from JobList.jsx
    },
  
    deleteJob: (e, id) => {
        console.log('deleteCard', e.target.id);
        dispatch(actions.deleteJobThunk(e.target.id));
    },

    fetchJobData: () => {    
      fetch('/jobs/getJobs', {
        method: 'GET',
      })
      .then(res => res.json())
      .then(jobs => { //compatible with how we are receiving this from the backend?
        dispatch(actions.updateAllJobs(jobs))
      })
      .catch(err => console.log('Error in fetchJobData:', err))
    }
  });

const JobListContainer = props => {
  //render on first load?
  const [job, setJobs] = React.useState([]) 
  useEffect(fetchJobData(), []) //how high do i want to put fetchjobdata?

//referring to id correctly?
  for (let i = 0; i < props.allJobs.length; i++) {
    jobs.push(<JobList key={i} id={props.allJobs[i]._id} 
                       company={props.allJobs[i].company} 
                       title={props.allJobs[i].title} 
                       salary={props.allJobs[i].salary} 
                       applied={props.allJobs[i].applied} 
                       date={props.allJobs[i].date} 
                       status={props.allJobs[i].status} 
                       />)
  }

  return (
    <div>
      <button id='new-job' onClick={(e)=>{props.createJob()}}> Add New Job </button>
      {jobs}
      <JobList/>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(JobListContainer);