import React, { useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
const Makepayment = () => {
    const{singleproduct}=useLocation().state||{}
    const imagepath="http://denniskifaru.alwaysdata.net/static/images/"
    // declare the states here 
    const [phone,setPhone] =useState()
  return (
    <div className="row justify-content-center">
        <h1 className='text-primary'>makepayment-lipa na mpesa</h1>
        <div className='col-md-6 card shadow p-4'>

            <h4 className='text-info text-start'>{singleproduct.product_name}</h4>
            {/* image goes here  */}
            <img src={imagepath+ singleproduct.product_photo} alt="" style={{height :"350px",objectFit:"console.assert(first, second)"}} />
            <p className='text-start '>{singleproduct.product_description}</p>
            <b className='text-start text-warning'>ksh: {singleproduct.product_cost}</b> <br />
            {/* bind the states  */}
            <h2>The current phone is:{phone}</h2>
            <form action="">
                <input type="number" className='form-control'
                placeholder='Enter phone 254xxxxxxxx' onChange={(e)=>setPhone(e.target.value)}/> <br />
                <button type='submit' className='btn btn-success w-100'>Make payment</button>
            </form>
        </div>
    </div>
  )
}

export default Makepayment