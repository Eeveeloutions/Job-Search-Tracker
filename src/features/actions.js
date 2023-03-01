import * as types from './actionTypes'

const actions = {};

//manually assign id? compatible with sql?
const createJob = (company, title, salary, applied, date, status, id) => ({
     type: types.ADD_LISTING,
     payload: {company, title, salary, applied, date, status, id},
});

actions.updateJob = (id, status) => ({
  type: types.UPDATE_LISTING,
  payload: {id, status}, //does this have to be destructured
});

const deleteJob = (id) => ({
    type: types.DELETE_LISTING,
    payload: id,
  });

const updateAllJobs = (jobs) => ({
  type: types.UPDATE_ALLJOBS,
  payload: allJobs,
})


actions.createJobThunk = (company, title, salary, applied, date, status) => dispatch => {

//need id returned from DB
  fetch('/jobs/createJobs', {
    method: 'POST',
    body: JSON.stringify({company, title, salary, applied, date, status }),
    headers: {'Content-Type': 'application/json'},
  })
  // we want to return id as res
  .then(res => {
    if(res.status === 200) {
      dispatch(createJob(company, title, salary, applied, date, status, res.body.id));
    } else {
      console.log('in createJobThunk - Server returned status', res.status)
    }
  })  
  .catch(err => console.log('Error in createJobThunk fetch:', err));
  
}

actions.updateJobThunk = (id, property, value) => dispatch => {
  fetch(`/job/update/?id=${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ id, property, value}),
    headers: {'Content-Type': 'application/json'},
  })
  .then(res => {
    if(res.status === 200) {
      dispatch(updateJob(id, property));
    } else {
      console.log('in updateJobThunk - Server returned status', res.status)
    }
  })  
  .catch(err => console.log('Error in updateJobThunk fetch:', err));
}

actions.deleteJobThunk = (id) => dispatch => {
  fetch(`/jobs/delete/?id=${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id: id}),
    headers: {'Content-Type': 'application/json'},
  })
  .then(res => {
    if(res.status === 200) {
      dispatch(deleteJob(id));
    } else {
      console.log('in deleteJobThunk - Server returned status', res.status)
    }
  })  
  .catch(err => console.log('Error in deleteJobThunk fetch:', err));
}


export default actions;