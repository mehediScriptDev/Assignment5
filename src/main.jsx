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
import RequireAuth from './components/RequireAuth'
import { AuthContext } from './context/AuthContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'

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
      { path: 'jobs', element: <Home /> },
      { path: 'applied-jobs', element: <RequireAuth role="USER"><AppliedJobs /></RequireAuth> },
      { path: 'user-dashboard', element: <RequireAuth role="USER"><UserDashboard /></RequireAuth> },
      { path: 'user-profile', element: <UserProfile /> },
      { path: 'edit-user-profile', element: <RequireAuth role="USER"><EditUserProfile /></RequireAuth> },

      // Company pages
      { path: 'company/dashboard', element: <RequireAuth role="COMPANY"><CompanyDashboard /></RequireAuth> },
      { path: 'company/create-job', element: <RequireAuth role="COMPANY"><CreateJob /></RequireAuth> },
      { path: 'company/manage-jobs', element: <RequireAuth role="COMPANY"><ManageJobs /></RequireAuth> },
      { path: 'company/applicants/:jobId?', element: <RequireAuth role="COMPANY"><Applicants /></RequireAuth> },
      { path: 'companies/:id', element: <CompanyProfile /> },
      { path: 'company/profile', element: <CompanyProfile /> },
      { path: 'company/settings', element: <RequireAuth role="COMPANY"><CompanySettings /></RequireAuth> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
)
