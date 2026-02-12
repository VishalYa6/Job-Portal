import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { applicationService } from '../api/applicationService';

export const applyForJobAction = createAsyncThunk('applications/apply', async (jobId, { rejectWithValue }) => {
  try {
    const data = await applicationService.applyForJob(jobId);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to apply for job');
  }
});

export const fetchUserDashboard = createAsyncThunk('applications/fetchUserDashboard', async (_, { rejectWithValue }) => {
  try {
    const data = await applicationService.getUserDashboard();
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
  }
});

export const fetchRecruiterDashboard = createAsyncThunk('applications/fetchRecruiterDashboard', async (_, { rejectWithValue }) => {
  try {
    const data = await applicationService.getRecruiterDashboard();
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch recruiter dashboard');
  }
});

const initialState = {
  userApplications: [],
  recruiterApplications: [],
  isLoading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyForJobAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(applyForJobAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(applyForJobAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        // Backend returns { message, stats, recentApplications }
        state.userApplications = action.payload?.recentApplications || [];
      })
      .addCase(fetchUserDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecruiterDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecruiterDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        // Backend returns { message, stats, recentApplications }
        state.recruiterApplications = action.payload?.recentApplications || [];
      })
      .addCase(fetchRecruiterDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = applicationSlice.actions;
export default applicationSlice.reducer;
