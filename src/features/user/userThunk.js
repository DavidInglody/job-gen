import { customFetch, checkForUnauthorizedResponse } from "../../utils/axios"
import { clearAllJobState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';
import { logoutUser } from "./userSlice";

export const registerUserThunk = async(url, user, thunkAPI) =>{
    try {
        const response = await customFetch.post(url, user)
        return response.data     
    } catch (error) {
        return checkForUnauthorizedResponse(error,thunkAPI)     
    }
}

export const loginUserThunk = async(url, user, thunkAPI) =>{
    try {
        const response = await customFetch.post(url, user)
        return response.data          
    } catch (error) {
        return checkForUnauthorizedResponse(error,thunkAPI)    
    }
}

export const updateUserThunk = async(url,user,thunkAPI) =>{
    try {
        const response = await customFetch.patch(url, user )
        return response.data
    } catch (error) {
        return checkForUnauthorizedResponse(error,thunkAPI)
    }    
}

export const clearStoreThunk =  async(message, thunkAPI)=>{
    try{
        // logout user
        thunkAPI.dispatch(logoutUser(message))
        // clear jobs value
        thunkAPI.dispatch(clearAllJobState())
        // clear job input values
        thunkAPI.dispatch(clearValues())
        return Promise.resolve()
    }
    catch(error){
        return Promise.reject(error)
    }
}