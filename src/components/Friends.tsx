import React, { useState } from 'react';
import Friend from '../icons/Friend';
import Coins from '../icons/Coins';
import { leaderBoard1, toadIcon } from '../images';
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'


export function Friends() {
    
    const navigate = useNavigate()
    const userId = window.Telegram.WebApp?.initDataUnsafe?.user?.id ? window.Telegram.WebApp?.initDataUnsafe?.user?.id : 'iamAM96'
    const userName = window.Telegram.WebApp?.initDataUnsafe?.user?.username ? window.Telegram.WebApp?.initDataUnsafe?.user?.username : 'iamAM96'
    // window.Telegram.WebApp.openTelegramLink(inviteUrl.result.invite_link)
    const [friends, setFriends] = useState([
        { id: 1, name: 'pushpaManna', score: 0, initials: 'PU', color: 'bg-pink-500' },
        { id: 2, name: 'AnanyaSshri', score: 42, initials: 'AN', color: 'bg-green-500' },
        { id: 3, name: 'bpmanna', score: 12, initials: 'BP', color: 'bg-green-500' },
        { id: 4, name: 'amanna', score: 42, initials: 'AM', color: 'bg-green-500' },
        { id: 5, name: 'anikb', score: 62, initials: 'AB', color: 'bg-green-500' },
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
    async function handleInvite(){
        console.log('skdnfkdsnf')
        const referral_url = `https://t.me/toad_drop_bot?start=${userId}`
        const telegram_url = `https://t.me/share/url?url=${referral_url}`
        window.Telegram.WebApp.openTelegramLink(telegram_url)
    }
    return (
        <div className="flex flex-col items-center bg-black text-white min-h-screen p-6">
            <div className="flex justify-center items-center w-full mb-8">
                <h1 className="text-2xl flex items-center">
                    Toad <span className="ml-2 text-2xl">🐾</span>
                </h1>
            </div>

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Invite friends</h2>
                <p className="text-2xl">and get more TOAD</p>
                <div className="flex justify-center mt-4">
                    <img src={toadIcon} alt="Toad" className="w-24 h-24 rounded-full" />
                </div>
                <button onClick={handleInvite} className="bg-white text-black py-2 px-4 rounded-full mb-8">Invite friends</button>
            </div>

            <div className="w-full mb-8">
                <h3 className="text-xl mb-4">{friends.length} friends</h3>
                {friends.map(friend => (
                    <div key={friend.id} className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className={`${friend.color} text-white w-10 h-10 rounded-full flex items-center justify-center`}>
                                {friend.initials}
                            </div>
                            <p className="ml-4">{friend.name}</p>
                        </div>
                        <p>+{friend.score} TOADs</p>
                    </div>
                ))}
            </div>



            <div className="fixed bottom-0 w-full bg-blue-700 flex justify-around items-center text-xs">
                <div onClick={navigateHome} className="text-center text-white w-1/5">
                    <Coins className="w-8 h-8 mx-auto" />
                    <p className="mt-1">Earn</p>
                </div>
                <div onClick={navigateLeaderBoard} className="text-center text-white w-1/5 m-1 p-2 rounded-2xl">
                    <img src={leaderBoard1} alt="Exchange" className="w-8 h-8 mx-auto" />
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
