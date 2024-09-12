import React from 'react'
import { logo } from '../../images'

export default function Header() {
    return (
        <div className='w-24 h-24 rounded-full bg-white justify-center p-2'>
            <img src={logo} alt="Toad" className='object-scale-down w-full h-full' />
        </div>
    )
}
