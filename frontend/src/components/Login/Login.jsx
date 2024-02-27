import './Login.css'

import { useContext, useState } from 'react';
import { StateContext } from '../../Contexts';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [state, setState] = useContext(StateContext);
    const navigate = useNavigate()

    function handleLogin() {
        if (email.length != 0 && password.length != 0) {
            setError('')
            fetch(`${import.meta.env.VITE_API_URL}/api/employee/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email, password: password})
            }).then(
                (response) => response.status == 200 ? response.json() : null
            ).then(
                (response) => {
                    if (response != null) {
                        setState({
                            ...state, 
                            isLoggedIn: true,
                            accessToken: response.access_token,
                            refreshToken: response.refresh_token
                        })
                        localStorage.setItem('isLoggedIn', true)
                        localStorage.setItem('accessToken', response.access_token)
                        localStorage.setItem('refreshToken', response.refresh_token)
                        navigate('/')   
                    } else {
                        setError('Invalid credentials')
                        setTimeout(() => setError(''), 3000)
                    }
                }
            ).catch(() => {
                setError('Something went wrong')
                setTimeout(() => setError(''), 3000)                
            })
        } else {
            setError('Credentials can\'t be empty')
            setTimeout(() => setError(''), 3000)
        }
    }

    return (
        <div className='login'>
            <div className='login-banner'>
                <img src='https://attendance.sankeysolutions.com/assets/sankeyLogo-03c06cb5.png'></img>
            </div>
            <div className='login-field-container'>
                <label className='login-field-label' htmlFor='email'>Email</label>
                <input type='email'  id='email' className='login-field' value={email} onChange={(event) => setEmail(event.target.value)}></input>
            </div>
            <div className='login-field-container'>
                <label className='login-field-label' htmlFor='password'>Password</label>
                <input type='password' id='password' className='login-field' value={password} onChange={(event) => setPassword(event.target.value)}></input>
            </div>
            <div className='error-field'>{error}</div>
            <button type='button' className='login-button' onClick={handleLogin}>Log In</button>
        </div>
    )
}

export default Login
