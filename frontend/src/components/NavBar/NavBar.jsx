import './NavBar.css'

import { NavLink } from 'react-router-dom'

function NavBar() {
    const navbarItems = [
        {
            to: 'add-user',
            text: 'Add User',
        },
        {
            to: 'view-users',
            text: 'View Users',
        },
        {
            to: 'job-triggers',
            text: 'Job Triggers'
        }
    ]

    return (
        <div className='navbar'>
            <div className='icon'>S</div>
            <div className='navitem-container'>
                {
                    navbarItems.map((value, index) => {
                        return <NavLink
                            key={`navlink-${index}`}
                            to={value.to}
                            className={`navitem ${({ isActive, isPending }) =>
                                isActive ? 'active' : isPending ? 'pending' : ''
                            }`}
                        >{value.text}</NavLink>
                    })
                }
            </div>
        </div>
    )
}

export default NavBar
