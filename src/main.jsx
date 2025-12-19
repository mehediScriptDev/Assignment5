import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './Layout/Layout'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import RegisterCompany from './Pages/RegisterCompany/RegisterCompany'
import AppliedJobs from './Pages/JobSeeker/AppliedJobs'
import UserDashboard from './Pages/JobSeeker/UserDashboard'
import JobDetails from './Pages/JobSeeker/JobDetails'
import UserProfile from './Pages/JobSeeker/UserProfile'
import EditUserProfile from './Pages/JobSeeker/EditUserProfile'
import CompanyDashboard from './Pages/Company/CompanyDashboard'
import CreateJob from './Pages/Company/CreateJob'
import ManageJobs from './Pages/Company/ManageJobs'
import Applicants from './Pages/Company/Applicants'
import CompanyProfile from './Pages/Company/CompanyProfile'
import CompanySettings from './Pages/Company/CompanySettings'
import { AuthContext } from './context/AuthContext'
import { AuthProvider } from './context/AuthContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'register-company', element: <RegisterCompany /> },
      // Job Seeker pages
      { path: 'jobs/:slug', element: <JobDetails /> },
      { path: 'applied-jobs', element: <AppliedJobs /> },
      { path: 'user-dashboard', element: <UserDashboard /> },
      { path: 'user-profile', element: <UserProfile /> },
      { path: 'edit-user-profile', element: <EditUserProfile /> },

      // Company pages
      { path: 'company/dashboard', element: <CompanyDashboard /> },
      { path: 'company/create-job', element: <CreateJob /> },
      { path: 'company/manage-jobs', element: <ManageJobs /> },
      { path: 'company/applicants/:jobId?', element: <Applicants /> },
      { path: 'company/profile', element: <CompanyProfile /> },
      { path: 'company/settings', element: <CompanySettings /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
