// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
// import axios from "axios";
// //createslice: accepts initial state, obj of reducer fxns, 
// //slice name, and automatically makes action creators and types
// //that correspond to reducers and state

// //i think can have fetch request directly in main page component
// const getJob = createAsyncThunk(
//   'jobList/getJobs', 
//   (arg, { rejectWithValue }) => {
//   try {
//     const { data } = axios.get('/');
//     return data;
//   } catch (err) {
//     rejectWithValue(err.response.data)
//   }
// })

// const createJob = createAsyncThunk(
//   'jobList/createJob',
//   async ({body}, {rejectWithValue}) => { //how do I use input values?
//     try {
//       const res = await axios.post('/jobs/createJobs', body)
//       return response.data
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// )

// const deleteJob = createAsyncThunk(
//   'jobList/deleteApp',
//   async ({id}, {rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`/jobs/delete/?id=${id}`);
//       return response.data //return id?
//     } catch (err) {
//       return rejectWithValue(err.response.data)
//     }
//   }
// );

// const updateJob = createAsyncThunk(
//   'jobList/updateJob',
//  async ({id, data}, { rejectWithValue }) => {
//   try {
//     const response = await axios.update(id, data)
//     return response.data
//   } catch (err) {
//     return rejectWithValue(err.response.data)
//   }
//  }
// );


// const initialState = {
//   appList: [],
//   totalApps: 0
// }

// //createSlice uses createreducer internally
// //prepare callback - to create the payload value of an action creator 
// //thunks
// //
// const jobListSlice = createSlice({
//   name: 'jobList',
//   initialState,
//   reducers: {
//     //do I need these???

//     // addApp: (state, action) => { //addApp is an action creator, returns action.type values, a combo os slice name 'jobList/addApp'
//     //   state.appList.push(action.payload) //what is passed in as state?
//     //   state.totalApps++
//     // },
//     // delApp: (state, action) => { //params passed into the reducers? 
//     //   state.appList.splice(state.appList.findIndex((id) => id === action.payload), 1);
//     //   state.totalApps--
//     // },
//     // upApp: (state) => {
//     //   state.appList
//     // },
//   },
//     extraReducers: () => {
//       [createJob.fulfilled]: (state, action) => {
//         state.appList.push(action.payload)
//         state.totalApps++
//       },
//       [deleteJob.fulfilled]: (state, action) => {
//         let index = state.findIndex(({id}) => id === action.payload.id);
//         state.appList.splice(index, 1);
//         state.totalApps--
//       },
//       [updateJob.fulfilled]: (state, action) => {
//         const index = state.findIndex(job => job.id === action.payload.id);
//         state.appList[index] = {
//           ...state.appList[index],
//           ...action.payload,
//         }
//       }
//     }
// })

// export const { reducer } = jobListSlice
// export default reducer
