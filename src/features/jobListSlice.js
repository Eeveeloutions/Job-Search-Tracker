import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from "axios";
//createslice: accepts initial state, obj of reducer fxns, 
//slice name, and automatically makes action creators and types
//that correspond to reducers and state


const getJobList = createAsyncThunk('jobList/getData', (arg, { rejectWithValue }) => {
  try{
    const { data } = axios.get('/');
    return data;
  } catch (err) {
    rejectWithValue(err.response.data)
  }
})

const initialState = {
  appList: [],
  totalApps: 0
}

//createSlice uses createreducer internally
//prepare callback - to create the payload value of an action creator 
//thunks
//
const jobListSlice = createSlice({
  name: 'jobList',
  initialState,
  reducers: {
    addApp: (state, action) => { //addApp is an action creator, returns action.type values, a combo os slice name 'jobList/addApp'
      state.appList.push(action.payload) //what is passed in as state?
      state.totalApps++
    },
    delApp: (state, action) => { //params passed into the reducers? 
      state.appList.splice(state.appList.findIndex((id) => id === action.payload), 1);
      state.totalApps--
    },
    upApp: (state) => {
      state.appList
    },
  },
    extraReducers: () => {
      [getJobList.pending]: (state, { payload }) => {
        state.loading = true;
      },
      [getJobList.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.isSuccess = true;
      },
      [getJobList.rejected]: (state, { payload }) => {
        state.message = payload;
        state.loading = false;
        state.isSuccess = false;

      }
    }
})

export const { addApp, delApp, upApp } = jobListSlice.actions
export default jobListSlice.reducer
