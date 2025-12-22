# LWS Job Portal

A modern job portal frontend application built with React. This platform connects job seekers with employers, enabling seamless job applications and candidate management.

## 🎯 Features

### For Job Seekers
- ✅ Browse and search job listings with advanced filters
- ✅ Apply for jobs with cover letters
- ✅ Upload and manage resumes and profile pictures
- ✅ Track application status (pending, accepted, rejected)
- ✅ View complete user profiles with portfolio
- ✅ Real-time profile updates with image uploads

### For Employers/Companies
- ✅ Create and manage job postings
- ✅ View and filter applicants
- ✅ Shortlist or reject candidates
- ✅ Download applicant resumes
- ✅ View detailed applicant profiles
- ✅ Upload company logo and manage company profile
- ✅ Track applications and hiring progress
- ✅ Dashboard with key metrics

### General Features
- ✅ User authentication (sign up, login, logout)
- ✅ Role-based access control (Job Seeker vs Company)
- ✅ Real-time profile picture and logo display
- ✅ Responsive design for all devices
- ✅ Toast notifications for user feedback
- ✅ Professional UI/UX with Tailwind CSS

## 🛠️ Tech Stack

- **React 18** - UI library
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Icons** - Icon library
- **Axios** - HTTP client

## 📋 Prerequisites

Before running this project, ensure you have:
- Node.js (v14 or higher)
- npm or yarn
- Backend API server running (port 9000) - provided separately

## 🚀 Getting Started

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assignment5
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_API_BASE=http://localhost:9000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── Pages/
│   ├── Home/              # Job listings and search
│   ├── JobSeeker/         # User profile, applications, dashboard
│   ├── Company/           # Company dashboard, job management
│   └── Login/             # Authentication pages
├── components/            # Reusable UI components
├── context/              # React context (Auth, Toast)
├── api/                  # API client configuration
├── Layout/               # App layout wrapper
└── main.jsx              # App entry point
```

## 🔑 Key Pages

### Job Seeker Routes
- `/` - Home page with job listings
- `/login` - User login
- `/register` - User registration
- `/user-dashboard` - Dashboard with statistics
- `/applied-jobs` - View applied jobs
- `/edit-user-profile` - Edit profile and upload resume/picture
- `/jobs/:slug` - Job details page

### Company Routes
- `/register-company` - Company registration
- `/company/dashboard` - Company dashboard
- `/company/create-job` - Create new job posting
- `/company/manage-jobs` - Manage all job postings
- `/company/applicants` - View all applicants
- `/company/applicant/:id` - View individual applicant details
- `/company/settings` - Company profile settings

## 🔐 Authentication

The app uses JWT-based authentication:
1. Users register and login
2. Token is stored in localStorage
3. Token is sent with each API request
4. Protected routes require authentication
5. Companies are redirected from job listings to their dashboard

## 📸 File Uploads

The application supports file uploads for:
- **User Profile Pictures** - JPEG, PNG, GIF, WEBP (2-5MB)
- **Resumes** - PDF, DOC, DOCX (5MB)
- **Company Logos** - JPEG, PNG, GIF, WEBP, SVG (2MB)

Files are served from the backend at: `http://localhost:9000/uploads/{type}/{filename}`

## 🎨 UI Components

Key reusable components:
- `RequireAuth` - Protected route wrapper
- `HomeGuard` - Redirects companies from home page
- `Toast` - Notification system
- `Header` - Navigation with user/company info
- `Layout` - App wrapper with header and footer

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Go to Vercel** (https://vercel.com)
   - Import repository
   - Set Root Directory: `.` (or specify the folder)
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables**
   - Add `VITE_API_BASE` with your production backend URL

4. **Deploy!**

## 🔄 API Integration

The frontend communicates with the backend at:
- Base URL: `http://localhost:9000/api` (development)
- Production: Configure via `VITE_API_BASE` environment variable

### Key API Endpoints

**Authentication**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

**Jobs**
- `GET /jobs` - Get all jobs with filters
- `GET /jobs/:slug` - Get job details
- `POST /jobs` - Create job (company only)
- `PUT /jobs/:id` - Update job (company only)

**Applications**
- `POST /jobs/:jobId/apply` - Apply for job
- `GET /my-applications` - Get user's applications
- `GET /jobs/:jobId/applicants` - Get job applicants (company only)
- `PATCH /applications/:id/status` - Update application status

**Profile**
- `POST /users/profile-picture` - Upload profile picture
- `POST /users/resume` - Upload resume
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile

**Company**
- `GET /companies/profile` - Get company profile
- `PUT /companies/profile` - Update company profile
- `POST /companies/logo` - Upload company logo
- `GET /companies/dashboard/stats` - Get dashboard stats

## 🐛 Troubleshooting

### Issue: API requests failing
- **Solution**: Check `VITE_API_BASE` in `.env` matches your backend URL
- **Solution**: Ensure backend server is running on port 9000

### Issue: Images not loading
- **Solution**: Use the `getFileUrl()` helper function to construct proper URLs
- **Solution**: Check file paths in database are relative (e.g., `/uploads/profiles/filename`)

### Issue: Authentication not working
- **Solution**: Token stored in localStorage under `token` key
- **Solution**: Check JWT token expiration in backend

### Issue: File uploads failing
- **Solution**: Ensure `/uploads` directories exist on backend
- **Solution**: Check file size limits in Multer configuration
- **Solution**: Verify file type validation

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is part of the Learn With Sumit assignment curriculum.

## 👨‍💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint and format (if configured)
npm run lint
```

### Environment Variables

**Development (.env)**
```
VITE_API_BASE=http://localhost:9000/api
```

**Production (Vercel)**
```
VITE_API_BASE=https://your-backend-url.com/api
```

## 🤝 Contributing

For issues or improvements, please contact the development team.

## 📧 Support

For support or questions, reach out through the contact page or email.

---

**Made with ❤️ for the LWS Job Portal Project**
