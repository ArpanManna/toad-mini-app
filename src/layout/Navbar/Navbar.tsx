import React from 'react'
import Coins from '../../icons/Coins'
import { leaderBoard, logo } from '../../images';
import Friend from '../../icons/Friend';
import { Link } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';


const navigationIcons = {
    earn: <Coins />,
    challenges: <FaTasks className='w-[24px] h-[24px]' />,
    leaderboard: <img src={leaderBoard} alt="Exchange" className="w-8 h-8 mx-auto" />,
    friends: <Friend className="w-8 h-8 mx-auto" />
}

const routes = [
    {
        label: 'Earn',
        path: '/',
        svg: 'earn'
    },
    {
        label: 'Tasks',
        path: '/tasks',
        svg: 'challenges'
    },
    {
        label: 'Leaderboard',
        path: '/leaderboard',
        svg: 'leaderboard'
    },
    {
        label: 'Friends',
        path: '/friends',
        svg: 'friends'
    }
]
export default function Navbar() {
    return (
        <>
            <div className='min-h-[62px] h-[62px] w-full flex'></div>
            <div className="w-full mt-auto bg-blue-700 flex justify-around items-center text-xs fixed bottom-0">
                {
                    routes.map((item) => {
                        return (
                            <Link to={item.path} className="text-center text-white w-1/5 flex  items-center justify-center flex-col gap-[2px] py-1">
                                {
                                    navigationIcons[item.svg]
                                }
                                <p className="mt-1">{item.label}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    )
}
