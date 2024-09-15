import React, { useEffect } from 'react';
import './App.css'
import Home from './components/Home';
import Friends from './components/Friends';
import Leaderboard from './components/LeaderBoard';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './layout';
import Challenges from './components/Challenges';
import Game from './components/Game';
import WebApp from '@twa-dev/sdk';


function App() {
  const location = useLocation()
  useEffect(() => {
    WebApp.headerColor = '#000000'
  }, [])

  useEffect(() => {
    if (location.pathname === '/') {
      WebApp.BackButton.isVisible = false
      WebApp.BackButton.hide()
    }
    else {
      WebApp.BackButton.isVisible = true
      WebApp.BackButton.show()
    }
  }, [location.pathname])

  useEffect(() => {
    window?.Telegram?.WebApp?.onEvent('backButtonClicked', () => {
      history.back()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={
          <Home />
        } />
        <Route path=':id' element={<Game />} />
        <Route path="friends" element={<Friends />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path='tasks' element={<Challenges />} />
      </Route>
    </Routes>
  )
}

export default App
