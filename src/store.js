import { configureStore } from '@reduxjs/toolkit'
import jobListReducer from './features/jobListSlice'
import { ThunkMiddleware } from '@reduxjs/toolkit';

//configurestore accepts one obj param
  //input: reducer property assigned to fxn (root reducer) or obj of slice reducers to be combined to create root reducer via Redux's combineReducers()
const store = configureStore({
  reducer: {
    jobList : jobListReducer
    
  }
})

export default store;
