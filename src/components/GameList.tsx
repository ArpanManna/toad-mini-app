import React from 'react'
import { Link } from 'react-router-dom'
import Icons from '../icons/icons'
import { IoGameController } from "react-icons/io5";


const games = [{ name: "Dice Duel", route: 'dice-duel', icon: Icons['animateDice'] }, { name: "Match Pattern", route: "match-pattern", icon: Icons['matchPattern'] }]

const GameList = () => {

    return (
        <>
            <div className="flex min-w-full mb-4 items-center gap-[8px]">
                <div className='flex items-center justify-center'>
                <IoGameController />
                </div>
                <h2 className="text">Games</h2>
            </div>
            <div className="flex card justify-start gap-10 bg-gray-900 p-2 rounded-lg mb-2 min-w-full">
                {games?.map(({ name, route, icon }) =>
                    <Link to={`/${route}`} className='flex items-center flex-col gap-4 justify-center align-middle cursor-pointer' key={name} >
                        <div>
                            {icon}
                        </div>
                        <div>
                            {name}
                        </div>
                    </Link>)}
            </div>
        </>
    )
}

export default GameList