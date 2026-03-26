import axios from 'axios'
import React,{useState}from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    // declare our state here 
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")

    // three states for posting data
    const [loading,setLoading]=useState("") 
    const [success,setSuccess]=useState("")
    const[error,setError]=useState("")
    // function to handle submit 
    const handlesubmit= async (e)=>{
      e.preventDefault()
      setLoading("please wait...")
      // create an empty digital envelope 
      const formdata = new FormData()
      formdata.append("username",username)
      formdata.append("email",email)
      formdata.append("password",password)
      formdata.append("phone",phone)
      try {
        const response=await axios.post("http://denniskifaru.alwaysdata.net/api/signup",formdata)
        setSuccess(response.data.massage)
        setLoading("")
      } catch (error) {
        setError(error.message)
        setLoading("");
        
      }
    }
  return (
    <div className='full-height'>

    <div className="row mt-2 justify-content-center ">
        <div className='col-md-6  card shadow bg-secondary'>
            <h1>Sign up 👤</h1>
            {/* bind the states  */}
            <h2 className='text-info'>{loading}</h2>
            <h2 className='text-success'>{success}</h2>
            <h2 className='text-danger'>{error}</h2>

            <form action=""  onSubmit={handlesubmit}>
                <input type='text' placeholder='👤Enter Username' className='form-control indie-flower-regular' onChange={(e)=>setUsername(e.target.value)}/><br />
                <input type='email' placeholder='📧Enter Email' className='form-control indie-flower-regular' onChange={(e)=>setEmail(e.target.value)}/><br />
                <input type='password'placeholder='🔒Enter Password' className='form-control indie-flower-regular' onChange={(e)=>setPassword(e.target.value)}/><br />
                <input type='phone'placeholder='📱Enter Phone Number'className='form-control indie-flower-regular' onChange={(e)=>setPhone(e.target.value)}/><br />
                <button type='submit' className='btn btn-primary w-100'>Sign up</button> <br />
                <p>Already have an account?  <Link to="/signin">Signin</Link></p>
            </form>
        </div>
        
    </div>
    </div>
  )
}

export default Signup