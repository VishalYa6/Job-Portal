# Job Portal - Complete Frontend Architecture Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [File Structure](#file-structure)
4. [Component Breakdown](#component-breakdown)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Authentication Flow](#authentication-flow)
8. [Routing](#routing)
9. [Performance](#performance)
10. [Deployment](#deployment)

---

## Overview

This is a **modern, scalable, and efficient** job portal frontend built with **React 19**, **Redux Toolkit**, and **Tailwind CSS**.

### Key Principles
- **Separation of Concerns**: API, State, Components are separated
- **DRY (Don't Repeat Yourself)**: Reusable components and services
- **Performance First**: Optimized rendering, lazy loading, caching
- **User Experience**: Responsive, intuitive, accessible
- **Maintainability**: Clean code, well-organized structure

---

## Architecture

### Layered Architecture

```
┌─────────────────────────────────────────┐
│         UI Layer (Components)           │  <-- Pages, Components
├─────────────────────────────────────────┤
│      State Management Layer (Redux)     │  <-- Slices, Selectors
├─────────────────────────────────────────┤
│      Data Access Layer (API Services)   │  <-- axios, API calls
├─────────────────────────────────────────┤
│      External APIs (Backend)            │  <-- REST endpoints
└─────────────────────────────────────────┘
```

### Data Flow

```
User Interaction
        ↓
Components (Pages)
        ↓
Redux Actions (Thunks)
        ↓
API Services
        ↓
Axios Instance (with interceptors)
        ↓
Backend REST API
        ↓
Redux Store (State Update)
        ↓
Components (Re-render)
        ↓
Updated UI
```

---

## File Structure

```
client/
├── src/
│   ├── api/                          # API Service Layer
│   │   ├── axiosInstance.js         # Axios configuration with interceptors
│   │   ├── authService.js           # Auth API calls (register, login)
│   │   ├── jobService.js            # Job CRUD operations
│   │   └── applicationService.js    # Application API calls
│   │
│   ├── components/                   # Reusable Components
│   │   ├── Navbar.jsx               # Navigation bar with auth state
│   │   └── ProtectedRoute.jsx       # Role-based route protection
│   │
│   ├── pages/                        # Page Components (Routes)
│   │   ├── LoginPage.jsx            # User login form
│   │   ├── RegisterPage.jsx         # User registration form
│   │   ├── JobListingPage.jsx       # Browse jobs with filters
│   │   ├── JobDetailsPage.jsx       # Single job details
│   │   ├── UserDashboard.jsx        # Applicant's applications
│   │   ├── RecruiterDashboard.jsx   # Recruiter's job posts
│   │   ├── CreateJobPage.jsx        # Create new job
│   │   ├── EditJobPage.jsx          # Edit existing job
│   │   ├── JobApplicationsPage.jsx  # Manage applications
│   │   ├── UnauthorizedPage.jsx     # 403 error page
│   │   └── NotFoundPage.jsx         # 404 error page
│   │
│   ├── store/                        # Redux State Management
│   │   ├── store.js                 # Redux store configuration
│   │   ├── authSlice.js             # Auth reducer & actions
│   │   ├── jobSlice.js              # Job reducer & actions
│   │   └── applicationSlice.js      # Application reducer & actions
│   │
│   ├── utils/                        # Utility Functions
│   │   └── helpers.js               # Formatting, storage helpers
│   │
│   ├── config/                       # Configuration
│   │   └── index.js                 # App config (API URL, etc)
│   │
│   ├── App.jsx                      # Main app with routing
│   ├── App.css                      # Global styles & animations
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Tailwind imports
│
├── index.html                       # HTML entry point
├── vite.config.js                   # Vite build config
├── eslint.config.js                 # ESLint rules
├── package.json                     # Dependencies
├── README.md                         # Full documentation
├── QUICKSTART.md                     # Quick setup guide
└── ARCHITECTURE.md                   # This file
```

---

## Component Breakdown

### Pages (Smart Components)

#### **LoginPage.jsx**
- Handles user login form
- Dispatches `login` action from Redux
- Redirects to dashboard on success
- Shows error messages

#### **RegisterPage.jsx**
- Handles user registration
- Role selection (Job Seeker / Recruiter)
- Company name for recruiters
- Validates input and shows errors

#### **JobListingPage.jsx**
- Displays all jobs in grid/card layout
- Real-time filtering by search, location, salary
- Fetches jobs on component mount
- Navigate to job details on click

#### **JobDetailsPage.jsx**
- Shows complete job information
- Displays recruiter details
- "Apply Now" button for job seekers
- Redirects to login if not authenticated

#### **UserDashboard.jsx**
- Shows applied jobs
- Displays application status (applied, reviewed, accepted, rejected)
- Shows job details for each application
- Job seeker only (protected route)

#### **RecruiterDashboard.jsx**
- Lists recruiter's posted jobs
- Shows job metrics (applications count)
- "View Applications" for each job
- "Edit" and "Delete" job options
- Link to "Post New Job"
- Recruiter only (protected route)

#### **CreateJobPage.jsx**
- Form to post new job
- Fields: title, description, company, location, salary, skills
- Validates input before submission
- Returns to dashboard on success

#### **EditJobPage.jsx**
- Pre-fills form with existing job data
- Updates job information
- Same fields as CreateJobPage
- Returns to dashboard on success

#### **JobApplicationsPage.jsx**
- Shows applications for specific job
- Lists applicant details and email
- Status badges (applied, reviewed, accepted, rejected)
- Action buttons: Review, Accept, Reject
- Recruiter only

### Reusable Components

#### **Navbar.jsx**
- Conditional rendering based on auth state
- Navigation links for authenticated users
- Shows user name and logout button
- Different links for job seekers and recruiters

#### **ProtectedRoute.jsx**
- Wrapper component for protected routes
- Checks authentication and role
- Redirects to login if not authenticated
- Redirects to unauthorized page if wrong role

---

## State Management

### Redux Store Structure

```javascript
{
  auth: {
    user: { _id, name, email, role, companyName },
    token: "jwt_token",
    isLoading: false,
    error: null
  },
  jobs: {
    jobs: [{_id, title, description, company, location, salary, skills, recruiter, timestamps}],
    selectedJob: {job object},
    isLoading: false,
    error: null
  },
  applications: {
    userApplications: [{job, applicant, status, timestamps}],
    recruiterApplications: [{job, applicant, status, timestamps}],
    isLoading: false,
    error: null
  }
}
```

### Auth Slice (authSlice.js)

**Actions:**
- `register(userData)` - Register new user
- `login(credentials)` - Login user
- `logout()` - Clear auth state
- `clearError()` - Clear error message

**State:**
- `user` - Current user object
- `token` - JWT token
- `isLoading` - Loading state
- `error` - Error message

**Async Thunks:**
- Calls auth services
- Stores token in localStorage
- Handles errors gracefully

### Job Slice (jobSlice.js)

**Actions:**
- `fetchAllJobs()` - Get all jobs
- `fetchJobById(jobId)` - Get single job
- `createJob(jobData)` - Create new job
- `updateJobAction(jobId, jobData)` - Update job
- `deleteJobAction(jobId)` - Delete job
- `clearError()` - Clear error

**State:**
- `jobs` - Array of job objects
- `selectedJob` - Currently viewing job
- `isLoading` - Loading state
- `error` - Error message

### Application Slice (applicationSlice.js)

**Actions:**
- `applyForJobAction(jobId)` - Submit application
- `fetchUserDashboard()` - Get user's applications
- `fetchRecruiterDashboard()` - Get recruiter's applications
- `clearError()` - Clear error

**State:**
- `userApplications` - User's applications array
- `recruiterApplications` - Recruiter's applications
- `isLoading` - Loading state
- `error` - Error message

---

## API Integration

### Axios Instance (axiosInstance.js)

**Features:**
- Base URL configuration
- Automatic token injection in headers
- CORS enabled with credentials
- Request/Response interceptors
- 401 error handling (auto-logout)

**Request Interceptor:**
```javascript
- Reads token from localStorage
- Adds to Authorization header as Bearer token
- Attaches to every request
```

**Response Interceptor:**
```javascript
- Catches 401 (Unauthorized)
- Clears stored token
- Redirects to login page
```

### Service Files

#### **authService.js**
```javascript
authService.register(userData)  → POST /auth/register
authService.login(credentials)  → POST /auth/login
authService.logout()            → Clear localStorage
```

#### **jobService.js**
```javascript
jobService.getAllJobs()         → GET /jobs
jobService.getJobById(jobId)    → GET /jobs/:id
jobService.createJob(data)      → POST /jobs
jobService.updateJob(id, data)  → PUT /jobs/:id
jobService.deleteJob(jobId)     → DELETE /jobs/:id
```

#### **applicationService.js**
```javascript
applicationService.applyForJob(jobId)          → POST /applications/:jobId
applicationService.getApplicationsForJob(jobId) → GET /applications/:jobId
applicationService.updateApplicationStatus()    → PUT /applications/:jobId
applicationService.deleteApplication(appId)    → DELETE /applications/:appId
applicationService.getUserDashboard()           → GET /applications/dashboard/user
applicationService.getRecruiterDashboard()      → GET /applications/dashboard/recruiter
```

---

## Authentication Flow

### Registration
```
1. User fills registration form
   ↓
2. Submit → Register action (Redux)
   ↓
3. authService.register() API call
   ↓
4. Backend creates user account
   ↓
5. Redirect to login page
   ↓
6. User can now login
```

### Login
```
1. User fills login form
   ↓
2. Submit → Login action (Redux)
   ↓
3. authService.login() API call
   ↓
4. Backend validates credentials
   ↓
5. Backend returns user + token
   ↓
6. Token stored in localStorage
   ↓
7. Redux state updated with user info
   ↓
8. Redirect to dashboard
```

### Token Usage
```
Every API Request:
  ↓
Axios interceptor reads token from localStorage
  ↓
Adds: Authorization: Bearer <token>
  ↓
API server validates token
  ↓
If valid: Process request
If invalid (401): Response interceptor redirects to login
```

### Logout
```
1. User clicks logout button
   ↓
2. Dispatch logout action
   ↓
3. Clear localStorage
   ↓
4. Clear Redux state
   ↓
5. Redirect to login page
```

---

## Routing

### Route Structure (App.jsx)

```javascript
// Public Routes
/login           → LoginPage
/register        → RegisterPage
/                → JobListingPage
/job/:jobId      → JobDetailsPage

// Job Seeker Routes (Protected - role: user)
/dashboard       → UserDashboard

// Recruiter Routes (Protected - role: recruiter)
/recruiter-dashboard              → RecruiterDashboard
/create-job                       → CreateJobPage
/edit-job/:jobId                  → EditJobPage
/job-applications/:jobId          → JobApplicationsPage

// Error Routes
/unauthorized    → UnauthorizedPage (403)
*                → NotFoundPage (404)
```

### Protected Route Logic

```javascript
<ProtectedRoute requiredRole="recruiter">
  <RecruiterDashboard />
</ProtectedRoute>
```

**Checks:**
1. Is user logged in? (Has token?)
   - No → Redirect to /login
2. Does user have required role?
   - No → Redirect to /unauthorized
3. Yes → Render component

---

## Performance Optimizations

### 1. **Redux for State Management**
- Centralized state reduces prop drilling
- Memoization prevents unnecessary re-renders
- Single source of truth

### 2. **Axios Interceptors**
- Token injection on every request
- Centralized error handling
- Automatic token refresh capability

### 3. **Code Splitting**
- React Router lazy loads pages
- Components load on demand
- Smaller initial bundle

### 4. **Client-Side Filtering**
- Job listings filter instantly
- No API calls for filters
- Better UX

### 5. **Caching**
- localStorage for token/user
- Redux cache for jobs
- Reduces API calls

### 6. **Conditional Rendering**
- Components render based on role
- Prevents unnecessary re-renders
- Cleaner DOM

### 7. **CSS Optimization**
- Tailwind CSS utility-first
- Purges unused styles in production
- Minimal CSS bundle

---

## Deployment

### Build for Production
```bash
npm run build
```

Creates optimized build in `dist/` folder

### Environment Variables
Create `.env` file:
```
VITE_API_BASE_URL=https://api.yoursite.com/api
```

### Deploy Static Files
Upload `dist/` folder to:
- Vercel
- Netlify  
- GitHub Pages
- AWS S3 + CloudFront
- Traditional web server

### Example (Vercel)
```bash
npm install -g vercel
vercel
```

### Example (Netlify)
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## Best Practices Implemented

✅ **Clean Code**
- Well-organized file structure
- Descriptive variable names
- DRY principles

✅ **Error Handling**
- Try-catch blocks
- Error messages to users
- Graceful fallbacks

✅ **Security**
- JWT token validation
- Authorization checks
- CORS configuration

✅ **User Experience**
- Loading states
- Error messages
- Smooth transitions
- Responsive design

✅ **Maintainability**
- Modular components
- Reusable services
- Clear dependencies
- Documentation

✅ **Performance**
- Optimized rendering
- Minimal API calls
- Efficient state management
- CSS optimization

---

## Common Development Tasks

### Add New Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `App.jsx`
3. Add navigation link in `Navbar.jsx`

### Add New API Call
1. Create service in `src/api/`
2. Create Redux slice in `src/store/`
3. Use in component via `useDispatch`

### Style New Component
1. Use Tailwind CSS classes
2. Add custom CSS to `App.css` if needed
3. Test responsive design

### Protect Route by Role
```javascript
<ProtectedRoute requiredRole="recruiter">
  <YourComponent />
</ProtectedRoute>
```

---

## Debugging & Troubleshooting

### Check Auth State
```javascript
// In component or console
import { useSelector } from 'react-redux';
const { user, token } = useSelector(state => state.auth);
console.log(user, token);
```

### Check API Calls
- Open DevTools → Network tab
- Look for API requests
- Check request/response

### Check Redux State
- Install Redux DevTools extension
- Open DevTools → Redux tab
- Inspect state and actions

### Common Issues

**"Cannot connect to API"**
- Check backend is running
- Verify API URL in axiosInstance.js
- Check CORS configuration

**"Protected route redirecting"**
- Check token in localStorage
- Verify user role equals requiredRole
- Check Redux auth state

**"Styles not applying"**
- Build Tailwind CSS: `npm run build`
- Clear cache: `npm cache clean --force`
- Check class names syntax

---

## Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] Search history and saved jobs
- [ ] User profiles with resume
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics for recruiters
- [ ] Job recommendations
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

**Built with ❤️ using React + Redux + Tailwind CSS**
