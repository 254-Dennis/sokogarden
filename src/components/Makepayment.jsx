import React from 'react'

const Makepayment = () => {
  return (
    <div className="row justify-content-center">
        <h1 className='text-primary'>makepayment-lipa na mpesa</h1>
        <div className='col-md-6 card shadow p-4'>
            {/* image goes here  */}
            <h4 className='text-info text-start'>product name</h4>
            <p className='text-start '>product description</p>
            <b className='text-start text-warning'>ksh: 20</b> <br />
            <form action="">
                <input type="number" className='form-control'
                placeholder='Enter phone 254xxxxxxxx' /> <br />
                <button type='submit' className='btn btn-success w-100'>Make payment</button>
            </form>
        </div>
    </div>
  )
}

export default Makepayment