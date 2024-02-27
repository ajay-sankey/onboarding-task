import './Header.css'

import { StateContext } from '../../Contexts'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {

    const [state, setState] = useContext(StateContext)
    const navigate = useNavigate()

    function handleLogout() {
        setState({
            ...state, 
            isLoggedIn: false,
            accessToken: null,
            refreshToken: null
        })
        localStorage.setItem('isLoggedIn', false)
        localStorage.setItem('accessToken', null)
        localStorage.setItem('refreshToken', null)
        navigate('/login')   
    }

    return (
        <div className='header'>
            <div className='header-title'>e-Onboard</div>
            <div className='profile-icon'>AD</div>
            <button className='logout-button' onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default Header
