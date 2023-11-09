import { useDispatch, useSelector } from "react-redux"
import FormRow from "../components/FormRow"
import { useState } from "react"
import { toast } from "react-toastify"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { updateUser } from "../features/user/userSlice"


const Profile = () => {
  const {user, isLoading} = useSelector((store)=> store.user)
  const dispatch = useDispatch()
  

  const [userData,setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || ""
  })

  const onSubmit = (e) =>{
    e.preventDefault()
    const {name,email,lastName,location}= userData

    if(!name || !lastName || !email || !location){
      toast.error("Please Fill Out All Fields")
      return 
    }
    dispatch(updateUser(userData))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData({...userData, [name]:value})
  }

  return <Wrapper>
    <form className="form" onSubmit={onSubmit}>
      <h3>profile</h3>
      <div className="form-center">
        <FormRow 
          type="text"
          name= "name"
          value= {userData.name}
          handleChange= {handleChange}
          />
        <FormRow 
          type="text"
          name= "lastName"
          labelText="Last Name"
          value= {userData.lastName}
          handleChange= {handleChange}
          />
        <FormRow 
          type="email"
          name= "email"
          labelText="Email"
          value= {userData.email}
          handleChange= {handleChange}
          />
        <FormRow 
          type="text"
          name= "location"
          labelText="Location"
          value= {userData.location}
          handleChange= {handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading} >
            {isLoading? "is loading...":"Change profile"}
          </button>
      </div>

    </form>
  </Wrapper> 
}
export default Profile