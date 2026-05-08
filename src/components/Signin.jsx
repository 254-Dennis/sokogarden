import axios from 'axios'
import React,{use, useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Signin = () => {
    // declare our states here 
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    // define three state for posting data 
    const[loading,setLoading]=useState("")
    const[success,setSuccess]=useState("")
    const[error,setError]=useState("")
    const [strength, setStrength]=useState("");
    const navigate = useNavigate();
    // fuction to handle submit 
    const handlesubmit=async(e)=>{
        e.preventDefault()
        setLoading("please wait..")
        const formdata=new FormData()
        formdata.append("email",email)
        formdata.append("password",password)
        try {
            const response=await axios.post("http://denniskifaru.alwaysdata.net/api/signin",formdata)
            setSuccess(response.data.message)
            setLoading("")
            navigate("/")
            
        } catch (error) {
          console.log("Full error:", error)
          console.log("Response:",error.response)
            setError(error.response?.data?.message || error.message)
        setLoading("");
        
        }
        
    }
    const checkPasswordStrength = (password)=>{
      if(password.length< 4){
        setStrength("weak");
      }else if(password.length<8){
        setStrength("medium");
      }else{
        setStrength('strong');
      }
    };

  return (
    <div className='full-height'>
  <div className='row mt-2 justify-content-center'>
    <div className='col-md-6 card shadow bg-success'>
        <h1>sign in 👤</h1>
        {/* bind the states  */}
        <h2 className='text-warning'>{loading}</h2>
        <h2 className='text-success'>{success}</h2>
        <h2 className='text-danger'>{error}</h2>
        <form onSubmit={handlesubmit}>
            <input type="email" placeholder='📧Enter Email'className='form-control indie-flower-regular'onChange={(e)=>setEmail(e.target.value)}/><br />
            <input type="password" placeholder='🔒Enter password'className='form-control indie-flower-regular'  onChange={(e)=>{setPassword(e.target.value); checkPasswordStrength(e.target.value); }} /><br />
            {password && (
                  <p
                  style={{
                    color:
                    strength ==="weak"
                    ? "red"
                    :strength ==="medium"
                    ?"orange"
                    :"yellow",
                  }}
                  >
                    password Strength: {strength}
                  </p>
                )}
            <button type='submit'className='btn btn-primary w-100'>signin</button>
            <p>Don't have an account?<Link to="/Signup">Signup</Link></p>
        </form>
    </div>
  </div>
  </div>
  )

}

export default Signin