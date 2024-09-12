import React, { lazy } from 'react'
import { useLocation } from 'react-router-dom'
import Coins from '../icons/Coins'

const DiceDuel = lazy(() => import('../Games/DiceDuel/DiceDuel'))
const PatternMatch = lazy(() => import('../Games/PatternMatch'))

const games = {
    'match-pattern': <PatternMatch />,
    'dice-duel': <DiceDuel />
}

export default function Game() {
    const location = useLocation()
    const game = location.pathname.replace('/', '')
    return (
        <>
            <React.Suspense fallback={<h2 className=' text-white'> Loading .....</h2>}>
                {
                    games[game]
                }
            </React.Suspense>
        </>
    )
}
