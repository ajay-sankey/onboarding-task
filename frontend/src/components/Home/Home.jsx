import './Home.css'

import { useContext } from 'react'
import { StateContext } from '../../Contexts'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'

function Home() {
    const navLinks = [
        {
            to: 'dashboard',
            text: 'Dashboard'
        },
        {
            to: 'add-user',
            text: 'Add User'
        },
        {
            to: 'job-triggers',
            text: 'Job Triggers'
        },
        {
            to: 'user-details',
            text: 'User Details'
        }
    ]
    const [state] = useContext(StateContext)

    if (!state.isLoggedIn) {
        return <Navigate to='/login'></Navigate>
    }

    return (
        <div className='home'>
            <NavBar navLinks={navLinks}></NavBar>
            <div className='header-outlet-container'>
                <Header></Header>
                <Outlet></Outlet>
            </div>
        </div>
    ) 

}

export default Home
