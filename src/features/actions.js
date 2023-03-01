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


actions.createJobThunk = (company, title, salary, applied, date, status) => dispatch => {
//   const id = lastid++ ?????? 

  fetch('/jobs/createJobs', {
    method: 'POST',
    body: JSON.stringify({ id: id, company, title, salary, applied, date, status }), //may need to adjust this
    headers: {'Content-Type': 'application/json'},
  })
  .then(res => {
    if(res.status === 200) {
      dispatch(createJob(company, title, salary, applied, date, status));
    } else {
      console.log('in createJobThunk - Server returned status', res.status)
    }
  })  
  .catch(err => console.log('Error in createJobThunk fetch:', err));
  
}

actions.updateJobThunk = (id, status) => dispatch => {
  fetch(`/job/update/?id=${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ id: id, status: status}),
    headers: {'Content-Type': 'application/json'},
  })
  .then(res => {
    if(res.status === 200) {
      dispatch(updateJob(id, status));
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