import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, showStatsThunk } from './AllJobsThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

export const getAllJobs = createAsyncThunk("allJobs/getJobs", getAllJobsThunk)
export const showStats = createAsyncThunk("allJobs/stats", showStatsThunk)

const allJobsSlice = createSlice({
    name:"allJobsSlice",
    initialState,
    reducers:{
      showLoading:(state)=>{
        state.isLoading= true
      },
      hideLoading:(state)=>{
        state.isLoading= false
      },
      handleChange:(state,{payload:{name,value}})=>{
        state.page= 1
        state[name] = value
      },
      clearFilters: (state)=>{
        return {...state, ...initialFiltersState}
      },
      changePage:(state,{payload})=>{
        state.page = payload
      },
      clearAllJobState: (state) => initialState
    },
    extraReducers:(builder)=> {
      builder.addCase(getAllJobs.pending, (state)=>{
        state.isLoading = true
      })
      builder.addCase(getAllJobs.fulfilled, (state,{payload})=>{
        state.isLoading = false
        state.jobs = payload.jobs
        state.numOfPages= payload.numOfPages
        state.totalJobs= payload.totalJobs
      })
      builder.addCase(getAllJobs.rejected, (state,{payload})=>{
        state.isLoading = false
        toast.error(payload)
      })
      builder.addCase(showStats.pending, (state)=>{
        state.isLoading = true
      })
      builder.addCase(showStats.fulfilled, (state, {payload})=>{
        state.isLoading = false
        state.stats = payload.defaultStats
        state.monthlyApplications = payload.monthlyApplications
      })
      builder.addCase(showStats.rejected, (state,{payload})=>{
        state.isLoading = false
        toast.error(payload)
      })      
    }
})

export const {showLoading, hideLoading, handleChange, clearFilters,changePage, clearAllJobState } = allJobsSlice.actions

export default allJobsSlice.reducer