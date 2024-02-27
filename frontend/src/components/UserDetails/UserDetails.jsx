import './UserDetails.css'

import { useContext, useEffect, useState } from 'react'
import { StateContext } from '../../Contexts'
import { useNavigate } from 'react-router-dom'

function UserDetails() {
    const [users, setUsers] = useState([])
    const [state] = useContext(StateContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/employee/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.accessToken}`
            },
        }).then(
            (response) => response.status == 200 ? response.json() : null
        ).then(
            (response) => {
                if (response != null) {
                    setUsers(response)
                } else {
                    console.log('Something went wrong')
                }                
            }
        ).catch(() => console.log('Something went wrong'))
    }, [])

    return (
        <div className='user-details'>
            <div className='user-details-title'>User Details</div>
            <div className='user-details-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Full Name</th>
                            <th>Date of Birth</th>
                            <th>Contact Number</th>
                            <th>Position</th>
                            <th>Role</th>
                            <th>City</th>
                            <th>Gender</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((value, index) => {
                                return (
                                    <tr 
                                        key={`user-${index}`}
                                        onClick={() => navigate(`/${value.employee_id}`)}
                                    >
                                        <td>{value.employee_id.toString().padStart(4, '0')}</td>
                                        <td>{value.full_name.split().map((value) => value.charAt(0).toUpperCase() + value.slice(1)).join(' ')}</td>
                                        <td>{value.date_of_birth}</td>
                                        <td>{value.contact_number}</td>
                                        <td>{value.position.split('_').map((value) => value.charAt(0).toUpperCase() + value.slice(1)).join(' ')}</td>
                                        <td>{value.role.split('_').map((value) => value.charAt(0).toUpperCase() + value.slice(1)).join(' ')}</td>
                                        <td>{value.city}</td>
                                        <td>{value.gender[0].toUpperCase() + value.gender.slice(1)}</td>
                                        <td>{value.is_synced ? 'Synced' : 'Not Synced'}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserDetails
