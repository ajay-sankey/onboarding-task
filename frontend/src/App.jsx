import './App.css'

import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StateContext } from './Contexts'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import AddUser from './components/AddUser/AddUser'
import UserDetails from './components/UserDetails/UserDetails'
import UserDetail from './components/UserDetail/UserDetail'

function App() {
  const [state, setState] = useState({
    isLoggedIn: localStorage.getItem('isLoggedIn'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  })
  
  return (
    <StateContext.Provider value={[state, setState]}>
      <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/' element={<Home></Home>}>
              {/* <Route path='dashboard' element={<DashBoard></DashBoard>}></Route> */}
              <Route path='add-user' element={<AddUser></AddUser>}></Route>
              {/* <Route path='job-triggers' element={<JobTriggers></JobTriggers>}></Route> */}
              <Route path='user-details' element={<UserDetails></UserDetails>}></Route>
              <Route path=':userId' element={<UserDetail></UserDetail>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </StateContext.Provider>
  )
}

export default App
