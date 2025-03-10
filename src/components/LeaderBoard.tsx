import React, { useEffect, useState } from 'react';
import { toadLogo } from '../images';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


export function Leaderboard() {
    const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.id
    const userName = window.Telegram.WebApp?.initDataUnsafe?.user?.username
    const initialValue = [
        { userName: '', balance: 0 }];
    const navigate = useNavigate()
    const [userRank, setUserRank] = useState(0)
    const [userBalance, setUserBalance] = useState(0)
    const [leaders, setLeaders] = useState(initialValue)
    const [holders, setHolders] = useState(0)

    useEffect(() => {
        getLeaders()
    }, [])

    const getLeaders = async () => {
        const res = await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/leaders?chatId=${userId}`,
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res && res.data && res.status == 200) {
            setUserBalance(res.data.userBalance)
            setUserRank(res.data.userRank)
            setHolders(convertToInternationalCurrencySystem(res.data.holders))
            setLeaders(res.data.leaderboard)
        }

    }

    function navigateFriends() {
        navigate('/friends')
    }
    function navigateHome() {
        navigate('/')
    }
    function navigateLeaderBoard() {
        navigate('/leaderboard')
    }
    function convertToInternationalCurrencySystem(labelValue) {

        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
            // Six Zeroes for Millions 
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

                    : Math.abs(Number(labelValue));

    }

    function getInitials(name) {
        if (!name) return 'A'
        const alphabet = name.slice(0, 2).toUpperCase()
        return alphabet
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getRankSymbol(index) {
        if (index == 0) {
            return '🥇'
        }
        if (index == 1) {
            return '🥈'
        }
        if (index == 2) return '🥉'
        return `#${Number(index) + 1}`
    }
    return (
        <div className="flex flex-col items-center bg-black text-white p-4 min-w-full">
            <div className='w-[128px] h-[128px] rounded-full bg-white justify-center'>
                <img src={toadLogo} alt="Toad" className=' object-cover w-full h-full rounded-[148px]' />
            </div>
            <div className="text-center mt-4 mb-4 w-full text-green-300">
                <h2 className="text-2xl font-bold">Wall of Fame</h2>
                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mt-4 card">
                    <div className="flex items-center">
                        <div className="bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center">
                            {getInitials(userName)}
                        </div>
                        <p className="ml-4">{userName}</p>
                    </div>
                    <p>{`${userBalance.toLocaleString()} TOAD`}</p>
                    <p>#{userRank}</p>
                </div>
            </div>

            <div className="w-full mb-8">
                <h3 className="text-xl mb-4 font-bold">{holders? `${holders.toLocaleString()} holders`: ''}</h3>
                {leaders.map((holder, index) => (
                    <div key={index} className="flex items-center justify-between mb-4 card">
                        <div className="flex items-center">
                            <div className={`bg-violet-700 text-white w-10 h-10 rounded-full flex items-center justify-center`}>
                                {getInitials(holder.userName)}
                            </div>
                            <div>
                                <p className="ml-5 font-bold">{holder.userName}</p>
                                <p className='ml-5 text-gray-400'>{holder.balance ? holder.balance.toLocaleString() : 0} TOAD</p>
                            </div>
                        </div>

                        <p>{getRankSymbol(index)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Leaderboard;
