import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
    return (
        <>
            <Toaster />
            <div className='flex flex-col gap-[10px]'>
                <Outlet />
                <Navbar />
            </div>
        </>
    )
}
