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
//   const levelNames = [
//     "Bronze",
//     "Silver",
//     "Gold",
//     "Platinum",
//     "Diamond",
//     "Epic",
//     "Legendary",
//     "Master",
//     "GrandMaster",
//     "Lord"
//   ];

//   const levelMinPoints = [
//     0, //Bronze 
//     5000, //Silver
//     25000, //Gold
//     100000, //Platinum
//     1000000, //Diamond
//     20000000, //Epic
//     100000000, //Legendary
//     5000000000, //Master
//     10000000000, //GrandMaster
//     100000000000 //Lord
//   ];


//   const [levelIndex, setLevelIndex] = useState(6);
//   const [points, setPoints] = useState(22749365);
//   const profitPerHour = 1264420; //Number of points user earns per hour in the spp

//   const calculateProgress = () => {
//     if (levelIndex >= levelNames.length - 1) {
//       return 100;
//     }
//     const currentLevelMin = levelMinPoints[levelIndex];
//     const nextLevelMin = levelMinPoints[levelIndex + 1];
//     const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
//     return Math.min(progress, 100);
//   };

//   const formatProfitPerHour = (profit: number) => {
//     if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
//     if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
//     if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
//     return `+${profit}`;
//   };

//   const handleTrivia = async (isCorrect) => {
//     console.log(isCorrect)
//   }

// }

export default App
