import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';
import { clearStoreThunk, loginUserThunk, registerUserThunk, updateUserThunk } from './userThunk';


const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};



export const registerUser = createAsyncThunk("user/registerUser", async(user,thunkAPI) =>{
    return registerUserThunk("auth/register", user, thunkAPI)
})

export const loginUser = createAsyncThunk("user/loginUser", async(user,thunkAPI) =>{
    return loginUserThunk("auth/login", user, thunkAPI)
})

export const updateUser = createAsyncThunk("user/updateUser", async(user,thunkAPI)=>{
    return updateUserThunk("auth/updateUser",user,thunkAPI)
})
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers :{
    toggleSidebar:(state)=>{
        state.isSidebarOpen = !state.isSidebarOpen
    },
    logoutUser:(state,action)=>{
        state.user = null
        state.isSidebarOpen = false
        removeUserFromLocalStorage()
        if(action.payload){
            toast.success("Logged out")
        }
    }
},
  extraReducers:(builder)=>{
    //  Register USER
    builder.addCase(registerUser.pending, (state)=>{
        state.isLoading = true
    })
    builder.addCase(registerUser.fulfilled, (state,action)=>{
        state.isLoading= false
        const{user} = action.payload
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`Hello There ${user.name}`)
    })
    builder.addCase(registerUser.rejected,(state,action)=>{
        state.isLoading = false
        toast.error(action.payload)
    })

    // Login USER
    builder.addCase(loginUser.pending, (state)=>{
        state.isLoading = true
    })
    builder.addCase(loginUser.fulfilled, (state,action)=>{
        state.isLoading= false
        const{user} = action.payload
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`welcome back ${user.name}`)
    })
    builder.addCase(loginUser.rejected,(state,action)=>{
        state.isLoading = false
        toast.error(action.payload)
    })

    //update USER
    builder.addCase(updateUser.pending,(state)=>{
        state.isLoading = true
    })
    builder.addCase(updateUser.fulfilled,(state,action)=>{
        state.isLoading = false
        const {user} = action.payload
        state.user = user
        addUserToLocalStorage(user)
        toast.success("Profile changed")
    })    
    builder.addCase(updateUser.rejected,(state,action)=>{
        state.isLoading = false
        toast.error(action.payload)
    })
    // Clear store
    builder.addCase(clearStore.rejected,()=>{
        toast.error("There was an error")
    })
  }
})


export default userSlice.reducer

export const {toggleSidebar, logoutUser} = userSlice.actions