import React, { useEffect, useState } from 'react';
import Friend from '../icons/Friend';
import Coins from '../icons/Coins';
import { leaderBoard, logo } from '../images';
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'
import { config } from '../../config.js';
import axios from 'axios';

export function Friends() {

    const navigate = useNavigate()
    const initialValue = [
        { userName: 'No Friends till now', score: 0 }];
    const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.id ? window.Telegram.WebApp?.initDataUnsafe?.user?.id
    const userName = window.Telegram.WebApp?.initDataUnsafe?.user?.username ? window.Telegram.WebApp?.initDataUnsafe?.user?.username
    const [friends, setFriends] = useState(initialValue)
    const [totalFriends, setTotalFriends] = useState(0)

    useEffect(() => {
        getFriends()
    }, [])

    const getFriends = async () => {
        try {
            const res = await axios.request({
                method: 'get',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_API_URL}/friends/?chatId=${userId}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (res && res.data && res.data.success == true) {
                setFriends(res.data.friendLists)
                setTotalFriends(res.data.totalFriends)

            } else {
                console.log('error')
                WebApp.showAlert("Failed to fetch Friends data!")
            }
        } catch (error) {
            console.log(error)
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
    async function handleInvite() {
        const referral_url = `${config.bot_link}?start=${userId}`
        const telegram_url = `https://t.me/share/url?url=${referral_url}`
        window.Telegram.WebApp.openTelegramLink(telegram_url)
    }

    function getInitials(name) {
        if (!name) return 'UF'
        const alphabet = name.slice(0, 1).toUpperCase()
        return alphabet
    }

    return (
        <div className="flex flex-col items-center bg-black text-white min-h-screen p-4">
            <div className='w-24 h-24 rounded-full bg-white justify-center p-2'>
                <img src={logo} alt="Toad" className='object-scale-down w-full h-full' />
            </div>
            <div className="text-center mb-4 mt-4">
                <h2 className="text-2xl font-bold">Invite friends</h2>
                <p className="text-xl">and</p>
                <p className="text-xl font-bold mb-4 text-green-300">collect more TOAD</p>

                <button onClick={handleInvite} className="bg-white text-black py-2 px-4 rounded-full mb-8 font-bold">Invite friends</button>
            </div>

            <div className="w-full mb-8">
                {totalFriends ? (
                    <h3 className="text-xl mb-4 font-semibold">{`${totalFriends} friends`} </h3>
                ) : (
                    <h3 className="items-center text-xl ml-4 mb-4 font-semibold font-sans"> </h3>
                )}

                {friends.map((friend, index) => (
                    <div key={index} className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className={`bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center`}>
                                {friend.userName ? getInitials(friend.userName.toString()) : 'UF'}
                            </div>
                            <p className="ml-4">{friend.userName ? friend.userName : 'Unable to fetch'}</p>
                        </div>
                        <p>+{friend.score} TOAD</p>
                    </div>
                ))}
            </div>


            <div className="fixed bottom-0 w-full bg-blue-700 flex justify-around items-center text-xs">
                <div onClick={navigateHome} className="text-center text-white w-1/5">
                    <Coins className="w-8 h-8 mx-auto" />
                    <p className="mt-1">Earn</p>
                </div>
                <div onClick={navigateLeaderBoard} className="text-center text-white w-1/5 m-1 p-2 rounded-2xl">
                    <img src={leaderBoard} alt="Exchange" className="w-8 h-8 mx-auto" />
                    {/* <p className="w-8 h-8 mx-auto">🏆</p> */}
                    <p className="mt-1">Leaderboard</p>
                </div>
                <div onClick={navigateFriends} className="text-center text-white w-1/5">
                    <Friend className="w-8 h-8 mx-auto" />
                    <p className="mt-1">Friends</p>
                </div>
            </div>
        </div>
    );
}

export default Friends;
