import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import {clearStore} from "../features/user/userSlice"

export const customFetch = axios.create({
    baseURL:"https://jobify-prod.herokuapp.com/api/v1/toolkit"
})

customFetch.interceptors.request.use(
    (config) =>{
        const user = getUserFromLocalStorage()
        if(user){
            config.headers["Authorization"] = `Bearer ${user.token}`
        }
        return config
    },(error) =>{
        return Promise.reject(error)
    }

)

export const checkForUnauthorizedResponse = (error, thunkAPI)=>{
    if(error.response.status === 401){
        thunkAPI.dispatch(clearStore())
        return thunkAPI.rejectWithValue("unauthorized! Logging out...")
    }
        return thunkAPI.rejectWithValue(error.response.data.msg)  
}