import React from 'react'
import { logo } from '../images'
import { Link } from 'react-router-dom'
import Icons from '../icons/icons'


const games = [{ name: "Dice Duel", route: 'dice-duel', icon: Icons['animateDice'] }, { name: "Match Pattern", route: "match-pattern", icon: Icons['matchPattern'] }]

const GameList = () => {

    return (
        <>
            <div className="flex min-w-full mb-4">
                <h2 className="text">Games</h2>
            </div>
            <div className="flex justify-start gap-10 bg-gray-900 p-2 rounded-lg mb-2 min-w-full">
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