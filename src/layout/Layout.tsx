import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
    return (
        <>
            <Toaster />
            <div className='flex justify-between h-full flex-col'>
                <Outlet />
                <Navbar />
            </div>
        </>
    )
}
