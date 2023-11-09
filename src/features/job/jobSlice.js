import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";


const initialState = {
    isLoading: false,
    position: "",
    company: "",
    jobLocation: "",
    jobTypeOptions: ["full-time", "part-time", "remote","internship"],
    jobType:"full-time",
    statusOptions: ["interview", "declined", "pending"],
    status:"pending",
    isEditing: false,
    editJobId: "",
}

export const createJob = createAsyncThunk("job/createJob", createJobThunk)
export const deleteJob= createAsyncThunk("job/deleteJob", deleteJobThunk)
export const editJob = createAsyncThunk("job/editJob",editJobThunk)

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers:{
        handleChange : (state, { payload: {name,value} }) => {
            state[name] = value
        },
        clearValues : ()=>{
            return{
                ...initialState,
                jobLocation: getUserFromLocalStorage()?.location || ""
            }
        },
        setEditJobs:(state,{payload})=>{
            return{...state, isEditing: true, ...payload}
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(createJob.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createJob.fulfilled, (state) => {
            state.isLoading = false
            toast.success("Job added")
        })
        builder.addCase(createJob.rejected, (state,{payload}) => {
            state.isLoading = false
            console.log(payload);
            toast.error(payload)
        })       
        builder.addCase(deleteJob.fulfilled, (state,{payload}) => {
            toast.success(payload)
        })      
        builder.addCase(deleteJob.rejected, (state,action) => {
            toast.error(action.payload)
        })
        builder.addCase(editJob.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(editJob.fulfilled, (state) => {
            state.isLoading = false
            toast.success("Job uploaded")
        })
        builder.addCase(editJob.rejected, (state,action) => {
            state.isLoading = false
            toast.error(action.payload)
        })            
    }
})

export const {handleChange,clearValues,setEditJobs} = jobSlice.actions

export default jobSlice.reducer