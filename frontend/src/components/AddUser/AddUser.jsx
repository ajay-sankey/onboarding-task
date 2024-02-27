import { StateContext } from '../../Contexts'
import './AddUser.css'

import { useContext, useState } from 'react'

function AddUser() {
    const [requestBody, setRequestBody] = useState({
        salutation: '',
        first_name: '',
        last_name: '',
        gender: '',
        date_of_birth: '',
        personal_email: '',
        contact_number: '',
        position: '',
        role: '',
        city: ''
    })
    const [state] = useContext(StateContext)

    function handleSubmit() {
        fetch('http://localhost:8000/api/employee/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.accessToken}`
            },
            body: JSON.stringify(requestBody)
        }).then(
            (response) => response.status == 200 ? response.json() : response.json()
        ).then(
            (response) => {
                if (response != null) {
                    console.log(response)   
                } else {
                    console.log('Something went wrong')
                }                
            }
        ).catch(() => console.log('Something went wrong'))
    }

    return (
        <div className='add-user'>
            <div className='add-user-title'>Add User</div>
            <div className='add-user-form-container'>
                <div className='add-user-form'>
                    <div className='add-user-form-field'>
                        <label className='add-user-form-label'>Salutation</label>
                        <select className='add-user-form-input' name='salution' id='salutation' onChange={(event) => setRequestBody({...requestBody, salutation: event.target.value})}>
                            <option value='mr'>Mr</option>
                            <option value='ms'>Ms</option>
                            <option value='mrs'>Mrs</option>
                        </select>
                    </div>
                    <div className='add-user-form-field'>
                        <label className='add-user-form-label'>First Name</label>
                        <input className='add-user-form-input' value={requestBody.first_name} onChange={(event) => setRequestBody({...requestBody, first_name: event.target.value})}></input>
                    </div>
                    <div className='add-user-form-field'>
                        <label className='add-user-form-label'>Last Name</label>
                        <input className='add-user-form-input' value={requestBody.last_name} onChange={(event) => setRequestBody({...requestBody, last_name: event.target.value})}></input>
                    </div>
                    <div className='add-user-form-field'>
                        <label className='add-user-form-label'>Gender</label>
                        <select className='add-user-form-input' name='gender' id='gender' onChange={(event) => setRequestBody({...requestBody, gender: event.target.value})}>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>
                    <div className='add-user-form-field'>
                        <label className='add-user-form-label'>Date of Birth</label>
                        <input type='date' className='add-user-form-input' value={requestBody.date_of_birth} onChange={(event) => setRequestBody({...requestBody, date_of_birth: event.target.value})}></input>
                    </div>
                    <div className='add-user-form-field'>
                        <label className='add-user-form-label'>Personal Email</label>
                        <input className='add-user-form-input' value={requestBody.personal_email} onChange={(event) => setRequestBody({...requestBody, personal_email: event.target.value})}></input>
                    </div>
                    <div className='add-user-form-field'>
                        <label className='add-user-form-label'>Contact Number</label>
                        <input className='add-user-form-input' value={requestBody.contact_number} onChange={(event) => setRequestBody({...requestBody, contact_number: event.target.value})}></input>
                    </div>
                    <div className='add-user-form-field'>
                        <label className='add-user-form-label'>Position</label>
                        <select className='add-user-form-input' name='gender' id='gender' onChange={(event) => setRequestBody({...requestBody, position: event.target.value})}>
                            <option value='solution_analyst'>Solution Analyst</option>
                            <option value='solution_architect'>Solution Architect</option>
                        </select>
                    </div>
                    <div className='add-user-form-field'>
                        <label className='add-user-form-label'>Role</label>
                        <select className='add-user-form-input' name='role' id='role' onChange={(event) => setRequestBody({...requestBody, role: event.target.value})}>
                            <option value='admin'>Admin</option>
                            <option value='read_only'>User (Read Only)</option>
                        </select>
                    </div>
                    <div className='add-user-form-field'>
                        <label className='add-user-form-label'>City</label>
                        <input className='add-user-form-input' value={requestBody.city} onChange={(event) => setRequestBody({...requestBody, city: event.target.value})}></input>
                    </div>
                </div>
                <div className='submit-button-container'>
                    <button className='submit-button' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddUser
