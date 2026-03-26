import axios from 'axios'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
    // declare our states here 
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    // define three state for posting data 
    const[loading,setLoading]=useState("")
    const[success,setSuccess]=useState("")
    const[error,setError]=useState("")
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
        } catch (error) {
            setError(error.message)
        setLoading("");
        
        }
        
    }

  return (
    <div className='full-height'>
  <div className='row mt-2 justify-content-center'>
    <div className='col-md-6 card shadow bg-success'>
        <h1>sign in 👤</h1>
        {/* bind the states  */}
        <h2 className='text-warning'>{loading}</h2>
        <h2 className='text-success'>{success}</h2>
        <h2 className='text-danger'>{error}</h2>
        <form action="" onSubmit={handlesubmit}>
            <input type="email" placeholder='📧Enter Email'className='form-control indie-flower-regular'onChange={(e)=>setEmail(e.target.value)}/><br />
            <input type="password" placeholder='🔒Enter password'className='form-control indie-flower-regular' onChange={(e)=>setPassword(e.target.value)} /><br />
            <button type='submit'className='btn btn-primary w-100'>signin</button>
            <p>Don't have an account?<Link to="/Signup">Signup</Link></p>
        </form>
    </div>
  </div>
  </div>
  )

}

export default Signin