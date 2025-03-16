import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Contest from './page/Contest';
import PastContest from './page/PastContest';
import Login from './page/Login';
import SignUp from './page/SignUp';
import LandingPage from './page/LandingPage';
function App() {
  return (
    <>
    <Router>
    <Routes>
            <Route exact path='/' element={<LandingPage/>}/>
            <Route exact path='/contest' element={<Contest/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/signup' element={<SignUp/>}/>
            <Route exact path='/pastContest' element={<PastContest/>}/>
    </Routes>
      
    </Router>
    </>
  )
}

export default App
