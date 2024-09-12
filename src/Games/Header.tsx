import React from 'react'
import { FaInfoCircle } from "react-icons/fa";
import Icons from '../icons/icons';

export default function Header({title, svgKey, handleClick}) {
    return (
        <div className=' flex justify-between w-full p-[8px]'>
            <div className=' flex items-center justify-center h-[32px] w-[32px] [&>svg]:stroke-[#86efac]'>{Icons[svgKey]}</div>
            <div className=' flex items-center justify-center font-mono font-bold text-[24px] text-green-300'>{title}</div>
            <div className=' flex items-center justify-center cursor-pointer' onClick={handleClick}><FaInfoCircle className='text-green-300'/></div>
        </div>
    )
}
