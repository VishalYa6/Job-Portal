import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobService } from '../api/jobService';

export const fetchAllJobs = createAsyncThunk('jobs/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const data = await jobService.getAllJobs();
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs');
  }
});

export const fetchJobById = createAsyncThunk('jobs/fetchById', async (jobId, { rejectWithValue }) => {
  try {
    const data = await jobService.getJobById(jobId);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch job');
  }
});

export const createJob = createAsyncThunk('jobs/create', async (jobData, { rejectWithValue }) => {
  try {
    const data = await jobService.createJob(jobData);
    return data.newJob;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create job');
  }
});

export const updateJobAction = createAsyncThunk('jobs/update', async ({ jobId, jobData }, { rejectWithValue }) => {
  try {
    const data = await jobService.updateJob(jobId, jobData);
    return data.job;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update job');
  }
});

export const deleteJobAction = createAsyncThunk('jobs/delete', async (jobId, { rejectWithValue }) => {
  try {
    await jobService.deleteJob(jobId);
    return jobId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete job');
  }
});

const initialState = {
  jobs: [],
  selectedJob: null,
  isLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchJobById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateJobAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateJobAction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.jobs.findIndex((j) => j._id === action.payload._id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(updateJobAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteJobAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteJobAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = state.jobs.filter((j) => j._id !== action.payload);
      })
      .addCase(deleteJobAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = jobSlice.actions;
export default jobSlice.reducer;
