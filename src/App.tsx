import { useState } from 'react';
import './App.css'
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Home from './components/Home';
import Friends from './components/Friends';
import Leaderboard from './components/LeaderBoard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Home />
        } />
        <Route path="/friends" element={ <Friends/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
      </Routes>

    </Router>
  )
}

export default App
