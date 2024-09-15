import React, { useEffect } from 'react';
import './App.css'
import Home from './components/Home';
import Friends from './components/Friends';
import Leaderboard from './components/LeaderBoard';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layout';
import Challenges from './components/Challenges';
import Game from './components/Game';
import WebApp from '@twa-dev/sdk';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={
            <Home />
          } />
          <Route path=':id' element={<Game />}/>
          <Route path="friends" element={<Friends />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path='/tasks' element={<Challenges/>} />
        </Route>
      </Routes>

    </Router >
  )
}

export default App
