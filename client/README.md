# Job Portal - Frontend Documentation

## Overview
A modern, efficient React-based job portal frontend built with Redux for state management, React Router for navigation, and Tailwind CSS for styling.

## Tech Stack
- **React 19** - UI Framework
- **Redux Toolkit** - State Management
- **React Router v7** - Client-side routing
- **Axios** - HTTP Client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Project Structure

### `/src`
```
src/
├── api/
│   ├── axiosInstance.js       # Axios config with interceptors
│   ├── authService.js          # Auth API calls
│   ├── jobService.js           # Job API calls
│   └── applicationService.js   # Application API calls
├── components/
│   ├── Navbar.jsx              # Navigation component
│   └── ProtectedRoute.jsx       # Role-based route protection
├── pages/
│   ├── LoginPage.jsx           # User login
│   ├── RegisterPage.jsx        # User registration
│   ├── JobListingPage.jsx      # Browse all jobs with filters
│   ├── JobDetailsPage.jsx      # Single job details & apply
│   ├── UserDashboard.jsx       # Applicant's applications
│   ├── RecruiterDashboard.jsx  # Recruiter's posted jobs
│   ├── CreateJobPage.jsx       # Post new job
│   ├── EditJobPage.jsx         # Edit job posting
│   ├── JobApplicationsPage.jsx # View/manage applications
│   ├── UnauthorizedPage.jsx    # 403 error page
│   └── NotFoundPage.jsx        # 404 error page
├── store/
│   ├── store.js                # Redux store configuration
│   ├── authSlice.js            # Auth state management
│   ├── jobSlice.js             # Job state management
│   └── applicationSlice.js     # Application state management
├── utils/
│   └── helpers.js              # Utility functions
├── App.jsx                     # Main app component with routing
├── App.css                     # Global styles
├── main.jsx                    # React entry point
└── index.css                   # Tailwind imports
```

## Features

### Authentication
- User registration with role selection (Job Seeker / Recruiter)
- Secure login with JWT token storage
- Token-based API authentication via axios interceptors
- Automatic logout on token expiration

### Job Management
- **Browse Jobs**: View all jobs with search and filters (title, location, salary)
- **Job Details**: Detailed job information with recruiter contact
- **Post Jobs**: Recruiters can create new job listings
- **Edit/Delete**: Recruiters can manage their posted jobs

### Applications
- **Apply for Jobs**: Job seekers can apply for positions
- **Track Applications**: View application status and history
- **Manage Applications**: Recruiters can review, accept, or reject applications

### Dashboards
- **User Dashboard**: Track applied jobs and their statuses
- **Recruiter Dashboard**: View posted jobs and manage applications

### User Experience
- Responsive design for mobile, tablet, and desktop
- Real-time filters on job listings
- Protected routes based on user roles
- Error handling with user-friendly messages
- Loading states and transitions

## Key Components

### API Services (`/api`)
- **axiosInstance.js**: Configured axios with:
  - Automatic token injection in request headers
  - 401 error handling (redirects to login)
  - CORS enabled

### State Management (`/store`)
- **authSlice.js**: Manages user authentication and profile
- **jobSlice.js**: Manages job listings and CRUD operations
- **applicationSlice.js**: Manages applications and dashboards

### Protected Routes
```jsx
<ProtectedRoute requiredRole="recruiter">
  <RecruiterDashboard />
</ProtectedRoute>
```

## User Roles & Access

### Job Seeker (user)
- ✅ Browse all jobs
- ✅ View job details
- ✅ Apply for jobs
- ✅ View application status in dashboard
- ❌ Cannot post/manage jobs
- ❌ Cannot view recruiter dashboard

### Recruiter
- ✅ Post new jobs
- ✅ Edit/delete their jobs
- ✅ View applications for their jobs
- ✅ Update application status
- ✅ View recruiter dashboard
- ❌ Cannot apply for jobs
- ❌ Cannot view user dashboard

## Getting Started

### Installation
```bash
cd client
npm install
```

### Development
```bash
npm run dev
```

The app will run on `http://localhost:5173`

### Building
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## API Integration

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Job Endpoints
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job (recruiter only)
- `PUT /api/jobs/:id` - Update job (recruiter only)
- `DELETE /api/jobs/:id` - Delete job (recruiter only)

### Application Endpoints
- `POST /api/applications/:jobId` - Apply for job
- `GET /api/applications/:jobId` - Get job applications (recruiter only)
- `PUT /api/applications/:jobId` - Update application status (recruiter only)
- `DELETE /api/applications/:applicationId` - Delete application
- `GET /api/applications/dashboard/user` - User dashboard
- `GET /api/applications/dashboard/recruiter` - Recruiter dashboard

## Performance Optimizations

1. **Redux State Management**: Centralized state reduces prop drilling
2. **Axios Interceptors**: Token management and error handling
3. **Protected Routes**: Prevents unauthorized access
4. **Lazy Filters**: Client-side filtering for instant results
5. **CSS-in-Tailwind**: Utility-first approach for minimal CSS
6. **Conditional Rendering**: Components render based on user role

## Styling

- **Tailwind CSS**: Utility classes for responsive design
- **Custom CSS**: Global styles in `App.css` for animations and custom effects
- **Mobile-First**: Designed for mobile and scales up

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
