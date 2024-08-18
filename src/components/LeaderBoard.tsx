import React, { useState } from 'react';
import Friend from '../icons/Friend';
import Coins from '../icons/Coins';
import {  leaderBoard } from '../images';
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'


export function Leaderboard() {
    const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.id ? window.Telegram.WebApp?.initDataUnsafe?.user?.id : 'iamAM96'
    const userName = window.Telegram.WebApp?.initDataUnsafe?.user?.username ? window.Telegram.WebApp?.initDataUnsafe?.user?.username : 'iamAM96'
    console.log(userName)
    console.log(userId)
    const navigate = useNavigate()

    const [topHolders, setTopHolders] = useState([
        { id: 1, name: 'elkanadi', dogs: 18470451, initials: 'EL', color: 'bg-blue-500', medal: '🥇' },
        { id: 2, name: 'glebtma', dogs: 16671885, initials: 'GL', color: 'bg-pink-500', medal: '🥈' },
        { id: 3, name: 'Esalat', dogs: 13342157, initials: 'ES', color: 'bg-blue-700', medal: '🥉' },
        { id: 4, name: 'imGet', dogs: 12308949, initials: 'IM', color: 'bg-yellow-500', medal: '#4' },
    ]);
    function navigateFriends() {
        navigate('/friends')
    }
    function navigateHome() {
        navigate('/')
    }
    function navigateLeaderBoard() {
        navigate('/leaderboard')
    }
    return (
        <div className="flex flex-col items-center bg-black text-white min-h-screen p-6">
            <header className="flex justify-between items-center w-full mb-8">
                <button className="text-white text-2xl">&larr;</button>
                <h1 className="text-2xl flex items-center">
                    Dogs <span className="ml-2 text-2xl">🐾</span>
                </h1>
                <button className="text-white text-2xl">&#8942;</button>
            </header>

            <section className="text-center mb-8">
                <h2 className="text-2xl font-bold">Telegram Wall of Fame</h2>
                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mt-4">
                    <div className="flex items-center">
                        <div className="bg-brown-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                            IA
                        </div>
                        <p className="ml-4">{userName}</p>
                    </div>
                    <p>14,167 DOGS</p>
                    <p>#2268648</p>
                </div>
            </section>

            <section className="w-full mb-8">
                <h3 className="text-xl mb-4">28.9M holders</h3>
                {topHolders.map(holder => (
                    <div key={holder.id} className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className={`${holder.color} text-white w-10 h-10 rounded-full flex items-center justify-center`}>
                                {holder.initials}
                            </div>
                            <p className="ml-4">{holder.name}</p>
                        </div>
                        <p>{holder.dogs.toLocaleString()} DOGS</p>
                        <p>{holder.medal}</p>
                    </div>
                ))}
            </section>

            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
                <div onClick={navigateHome} className="text-center text-[#85827d] w-1/5">
                    <Coins className="w-8 h-8 mx-auto" />
                    <p className="mt-1">Earn</p>
                </div>
                <div onClick={navigateLeaderBoard} className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
                    <img src={leaderBoard} alt="Exchange" className="w-8 h-8 mx-auto" />
                    <p className="mt-1">Leaderboard</p>
                </div>
                <div onClick={navigateFriends} className="text-center text-[#85827d] w-1/5">
                    <Friend className="w-8 h-8 mx-auto" />
                    <p className="mt-1">Friends</p>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;
