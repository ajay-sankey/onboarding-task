/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
import './NavBar.css'

function NavBar({ navLinks }) {
    return (
        <div className='navbar'>
            <div className='navbar-icon'>S</div>
            <div className='navlinks-container'>
                {
                    navLinks.map((value, index) => {
                        return <NavLink 
                            className={`navlink ${({ isActive, isPending }) => {
                                isActive ? 'active' : isPending ? 'pending' : ''
                            }}`} 
                            key={`navlink-${index}`} to={value.to}>{value.text}</NavLink>
                        }
                    )
                }
            </div>
        </div>
    )
}

export default NavBar
