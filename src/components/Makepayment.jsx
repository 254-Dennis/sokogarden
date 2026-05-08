
import axios from 'axios'
import React, { useState } from 'react'
import { useLocation} from 'react-router-dom'
const Makepayment = () => {
    const{singleproduct}=useLocation().state||{}
    const imagepath="http://denniskifaru.alwaysdata.net/static/images/"
    // declare the states here 
    const [phone,setPhone] =useState()
    // states of posting data 
    const [loading,setLoading]=useState("")
    const [success,setSuccess]=useState("")
    const [error,setError]=useState("")
    const handlesubmit= async (e)=>{
        e.preventDefault()
      setLoading("please wait...")
      // create an empty digital envelope 
      const formdata = new FormData()
      formdata.append("phone",phone)
      formdata.append("amount", singleproduct.product_cost)
      try {
        const response=await axios.post("http://denniskifaru.alwaysdata.net/api/mpesa_payment" ,formdata)
        setSuccess(response.data.message)
        setLoading("")
      } catch (error) {
        setError(error.message)
        setLoading("");
      }
    }
  return (
    <div className="row justify-content-center">
        <h1 className='text-primary indie-flower-regular'>makepayment-lipa na mpesa</h1>
        <div className='col-md-6 card shadow p-4'>

            <h4 className='text-info text-start indie-flower-regular'>{singleproduct.product_name}</h4>
            {/* image goes here  */}
            <img src={imagepath+ singleproduct.product_photo} alt="" style={{height :"350px",objectFit:"initial"}} />
            <p className='text-start '>{singleproduct.product_description}</p>
            <b className='text-start text-danger'>ksh: {singleproduct.product_cost}</b> <br />
            {/* bind the states  */}
            <h2 className='text-success'>{loading}</h2>
            <h2 className='text-warning'>{success}</h2>
            <h2 className='text-danger'>{error}</h2>
            <form onSubmit={handlesubmit}>
                <input type="number" className='form-control'
                placeholder='Enter phone 254xxxxxxxx' onChange={(e)=>setPhone(e.target.value)}/> <br />
                <button type='submit' className='btn btn-success w-100' indie-flower-regular>Make payment</button>
            </form>
        </div>
    </div>
  )
}

export default Makepayment