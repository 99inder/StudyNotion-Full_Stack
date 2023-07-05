import React from 'react'
import Sidebar from '../components/core/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import Spinner from '../components/common/Spinner';

const Dashboard = () => {
    const { loading: profileLoading } = useSelector(state => state.profile);
    const { loading: authLoading } = useSelector(state => state.auth);

    if (authLoading || profileLoading)
        return <Spinner />

    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)'>
            <Sidebar />
            <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>
                {/* <div className='mx-auto w-11/12 max-w-[1000px] py-10'> */}
                <Outlet />
            </div>

        </div>
    )
}

export default Dashboard