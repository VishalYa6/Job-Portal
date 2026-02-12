# Frontend Setup & Quick Start Guide

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Configure API Endpoint
Update `src/config/index.js` if your backend API is not running on `http://localhost:8000`:

```javascript
API: {
  BASE_URL: 'http://your-api-url:port/api'
}
```

Or set environment variable:
```bash
VITE_API_BASE_URL=http://your-api-url:port/api npm run dev
```

## Running the Application

### Development Mode
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000 (must be running)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## Complete Application Setup

### In Terminal 1 - Start Backend
```bash
cd backend
npm run dev
```

Backend will start on `http://localhost:8000`

### In Terminal 2 - Start Frontend
```bash
cd client
npm run dev
```

Frontend will start on `http://localhost:5173`

## Default Test Credentials

After registering users, you can test with:

### Job Seeker
- Email: `seeker@test.com`
- Password: `password123`

### Recruiter
- Email: `recruiter@test.com`
- Password: `password123`

## Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── api/            # API service files
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── store/          # Redux store configuration
│   ├── utils/          # Utility functions
│   ├── config/         # Configuration files
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   ├── App.css         # Global styles
│   └── index.css       # Tailwind CSS imports
├── index.html          # HTML entry point
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── README.md           # Documentation
```

## Key Features Implemented

- ✅ User Authentication (Register/Login)
- ✅ Job Listings with Filters
- ✅ Job Details Page
- ✅ Job Applications
- ✅ User Dashboard (Track Applications)
- ✅ Recruiter Dashboard (Manage Jobs)
- ✅ Create/Edit/Delete Jobs
- ✅ Application Management (Accept/Reject)
- ✅ Role-based Access Control
- ✅ Responsive Design
- ✅ Error Handling
- ✅ Loading States

## API Endpoints Used

### Auth
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Jobs
- `GET /jobs` - Get all jobs
- `GET /jobs/:id` - Get job by ID
- `POST /jobs` - Create new job (recruiter)
- `PUT /jobs/:id` - Update job (recruiter)
- `DELETE /jobs/:id` - Delete job (recruiter)

### Applications
- `POST /applications/:jobId` - Apply for job
- `GET /applications/:jobId` - Get applications (recruiter)
- `PUT /applications/:jobId` - Update application status
- `DELETE /applications/:applicationId` - Delete application
- `GET /applications/dashboard/user` - User applications
- `GET /applications/dashboard/recruiter` - Recruiter dashboard

## Troubleshooting

### "Cannot connect to backend"
- Ensure backend is running on port 8000
- Check `src/api/axiosInstance.js` for correct API URL
- Check browser console for CORS errors

### "Module not found"
```bash
npm install
npm cache clean --force
```

### Port Already in Use
- Frontend (5173): `npm run dev -- --port 5174`
- Backend (8000): Update `PORT` in backend/.env

## Environment Variables

Create `.env` in client root for production builds:
```
VITE_API_BASE_URL=http://production-api.com/api
```

## Performance Tips

1. Use Redux DevTools for debugging: https://github.com/reduxjs/redux-devtools
2. Monitor network requests in browser DevTools
3. Check for unnecessary re-renders using React DevTools
4. Optimize images and assets

## Support & Issues

For issues or questions:
1. Check the README.md for detailed documentation
2. Review console errors in browser DevTools
3. Ensure backend API is responding correctly

## Next Steps

1. Test the application by creating accounts and jobs
2. Verify all features work as expected
3. Customize styling to match your brand
4. Deploy to production when ready

Happy coding! 🚀
