import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddUser from './components/AddUser/AddUser.jsx';
import JobTriggers from './components/JobTriggers/JobTriggers.jsx';
import ViewUsers from './components/ViewUsers/ViewUsers.jsx';
import ViewUser from './components/ViewUser/ViewUser.jsx';
import Login from './components/Login/Login.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: 'add-user',
        element: <AddUser></AddUser>
      },
      {
        path: 'job-triggers',
        element: <JobTriggers></JobTriggers>
      },
      {
        path: 'view-users',
        element: <ViewUsers></ViewUsers>,
      },
      {
        path: ':user_id',
        element: <ViewUser></ViewUser>
      }
    ],
  },
  {
    path: 'login',
    element: <Login></Login>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
