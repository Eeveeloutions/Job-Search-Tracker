import React, { useState } from 'react';
import { addApp, delApp, upApp } from '../features/jobListSlice';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar.jsx';

const MainPage = () => {
  
  return(
    <div>
      <Navbar />
    </div>
  )
}

export default MainPage