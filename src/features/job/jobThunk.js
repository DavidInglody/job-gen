import { clearValues } from "./jobSlice"
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice';
import { customFetch, checkForUnauthorizedResponse } from "../../utils/axios";



export const createJobThunk = async(job,thunkAPI)=>{
    try {
        const resp = await customFetch.post("/jobs", job)
        thunkAPI.dispatch(clearValues())
        return resp.data
    } catch (error) {
    return checkForUnauthorizedResponse(error,thunkAPI)      
    }
}

export const deleteJobThunk= async (jobId, thunkAPI) =>{
    thunkAPI.dispatch(showLoading())
    try {
        const response = await customFetch.delete(`jobs/${jobId}`)
        thunkAPI.dispatch(getAllJobs())
        return response.data.msg
    } catch (error) {
        thunkAPI.dispatch(hideLoading())
        return checkForUnauthorizedResponse(error,thunkAPI)
    }
}

export const editJobThunk = async({jobId, job}, thunkAPI)=>{
    try {
        const response = await customFetch.patch(`/jobs/${jobId}`, job)
        thunkAPI.dispatch(clearValues())
        return response.data
    } catch (error) {
        return checkForUnauthorizedResponse(error,thunkAPI)
    }
}
