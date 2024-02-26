import { useOutletContext, useNavigate } from 'react-router-dom'
import './ViewUsers.css'

function ViewUsers() {
    const [ isLoggedIn, data ] = useOutletContext()
    const navigate = useNavigate()

    if (!isLoggedIn) {
        navigate('login')
    }

    return (
        <div className='user-details'>
            <div className='user-details-title'>User Details</div>
            <div className='user-details-container'>
                <table>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile Number</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((value, index) => {
                            return <tr key={`user-${index}`}
                                onClick={() => navigate(`/${value.user_id}`)}
                            >
                                <td>{value.user_id}</td>
                                <td>{value.first_name}</td>
                                <td>{value.last_name}</td>
                                <td>{value.mobile_no}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewUsers
