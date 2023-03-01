import { configureStore } from '@reduxjs/toolkit'
import reducer from './features/jobListSlice'
import { ThunkMiddleware } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import jobsReducer from './reducers/reducer.js';

//configurestore accepts one obj param
  //input: reducer property assigned to fxn (root reducer) or obj of slice reducers to be combined to create root reducer via Redux's combineReducers()
// const store = configureStore({
//   reducer: reducer
// })


const store = createStore(
  jobsReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store;
