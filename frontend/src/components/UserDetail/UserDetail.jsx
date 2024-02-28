import './UserDetail.css'

import { useParams, Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { StateContext } from '../../Contexts'


function UserDetail() {
    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [state] = useContext(StateContext)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/employee/${userId}`, {
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
                    setUser(response[0])
                } else {
                    console.log('Something went wrong')
                }                
            }
        ).catch(() => console.log('Something went wrong'))
    }, [])

    if (!state.isLoggedIn) {
        return <Navigate to='/login'></Navigate>
    }

    return (
        <div className='user-detail'>
            <div className='user-detail-title'>User Info</div>
            <div className='user-detail-container'>
                <div className='user-detail-field'>
                    <span className='user-detail-field-title'>Employee Id</span>    
                    <span className='user-detail-field-value'>{user != null ? user.employee_id.toString().padStart(4, '0') : ''}</span>    
                </div>
                <div className='user-detail-field'>
                    <span className='user-detail-field-title'>Salutation</span>    
                    <span className='user-detail-field-value'>{user != null ? user.salutation[0].toUpperCase() + user.salutation.slice(1) : ''}</span>    
                </div>
                <div className='user-detail-field'>
                    <span className='user-detail-field-title'>First Name</span>    
                    <span className='user-detail-field-value'>{user != null ? user.first_name : ''}</span>    
                </div>
                <div className='user-detail-field'>
                    <span className='user-detail-field-title'>Last Name</span>    
                    <span className='user-detail-field-value'>{user != null ? user.last_name : ''}</span>    
                </div>
                <div className='user-detail-field'>
                    <span className='user-detail-field-title'>Gender</span>    
                    <span className='user-detail-field-value'>{user != null ? user.gender[0].toUpperCase() + user.gender.slice(1) : ''}</span>    
                </div>
                <div className='user-detail-field'>
                    <span className='user-detail-field-title'>Date of Birth</span>    
                    <span className='user-detail-field-value'>{user != null ? user.date_of_birth : ''}</span>    
                </div>
                <div className='user-detail-field'>
                    <span className='user-detail-field-title'>Personal Email</span>    
                    <span className='user-detail-field-value'>{user != null ? user.personal_email : ''}</span>    
                </div>
                <div className='user-detail-field'>
                    <span className='user-detail-field-title'>Email</span>    
                    <span className='user-detail-field-value'>{user != null ? user.email : ''}</span>    
                </div>
                <div className='user-detail-field'>
                    <span className='user-detail-field-title'>Contact Number</span>    
                    <span className='user-detail-field-value'>{user != null ? user.contact_number : ''}</span>    
                </div>
                <div className='user-detail-field'>
                    <span className='user-detail-field-title'>Position</span>    
                    <span className='user-detail-field-value'>{user != null ? user.position.split('_').map((value) => value.charAt(0).toUpperCase() + value.slice(1)).join(' ') : ''}</span>    
                </div>
                <div className='user-detail-field'>
                    <span className='user-detail-field-title'>Role</span>    
                    <span className='user-detail-field-value'>{user != null ? user.role.split('_').map((value) => value.charAt(0).toUpperCase() + value.slice(1)).join(' ') : ''}</span>    
                </div>
            </div>        
        </div>
    )
}

export default UserDetail
