import { useEffect, useState } from "react"
import Wrapper from "../assets/wrappers/RegisterPage"
import {Logo,FormRow} from "../components"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"



const initialState = {
  name: "",
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {

  const navigate = useNavigate()

  const[values,setValues] = useState(initialState)
  const{user,isLoading} = useSelector(store=> store.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(user){
      setTimeout(() => {
        navigate("/")        
      }, 2000);
    }
  },[user,navigate])

  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value 

    setValues({...values, [name]: value })
  }

  const onSubmit = (e)=>{
    e.preventDefault()
    const {name,email,password,isMember}= values
    if(!email || !password || (!isMember && !name )){
      toast.error('Please Fill Out All Fields')
      return
    }
    if(isMember){
      dispatch(loginUser({email:email, password:password}))
      return
    }
    dispatch(registerUser({name, email, password}))
  }

  const toggleMember = ()=>{
    setValues({...values, isMember: !values.isMember})
  }


  return <Wrapper className="full-page">
    <form className="form" onSubmit={onSubmit}>
      <Logo/>
      <h3>{values.isMember ? "Login" : "Register" }</h3>
      {/* Name field */}
      {!values.isMember && (
        <FormRow type="text" name= "name" value={values.name} handleChange={handleChange} labelText="name"/>
      )}
      {/* Email field */}
      <FormRow type="email" name= "email" value={values.email} handleChange={handleChange} labelText="email"/>  
      {/*Password field */}
      <FormRow type="password" name= "password" value={values.password} handleChange={handleChange} labelText="password"/>  
      <button type="submit" className="btn btn-block" disabled={isLoading}>
        {isLoading? "loading..." : "submit"}
      </button>
      <button type="button" className="btn btn-block btn-hipster" disabled={isLoading} onClick={()=> dispatch(loginUser({email: "testUser@test.com" ,password : "secret"}))}>
        {isLoading? "loading..." : "demo user"}
      </button>
      <p>
        {values.isMember ? "Not a member yet?" : "Already a member ?"}
        <button type="button" className="member-btn" onClick={toggleMember}>{values.isMember? "Register":"Login"}</button>
      </p>
    </form>
  </Wrapper>
}
export default Register