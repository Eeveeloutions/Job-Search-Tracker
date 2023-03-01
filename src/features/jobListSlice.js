import { createSlice } from '@reduxjs/toolkit'; 
//createslice: accepts initial state, obj of reducer fxns, 
//slice name, and automatically makes action creators and types
//that correspond to reducers and state

//createslice uses createreducer internally

const initialState = {
  appList: [],
  totalApps: 0
}

const jobListSlice = createSlice({
  name: 'jobList',
  initialState,
  reducers: {
    addApp: (state, action) => { //addApp is an action creator, returns action.type values, a combo os slice name 'jobList/addApp'
      state.appList.push(action.payload) //what is passed in as state?
      state.totalApps++
    },
    delApp: (state, action) => { //params passed into the reducers? 
      
    },
    upApp: (state) => {
      //update status? notes?
    },
  },
})

export const { addApp, delApp, upApp } = jobListSlice.actions
export default jobListSlice.reducer
