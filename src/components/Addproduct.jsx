import axios from 'axios'
import React,{useState} from 'react'

const Addproduct = () => {
    // declear our states here 
    const [product_name, setProduct_Name]=useState("")
    const [product_description,setProduct_Description]=useState("")
    const[product_cost,setProduct_Cost]=useState("")
    const[product_photo,setProduct_Photo]=useState("")
    // three states for posting data 
    const[loading ,setLoading]=useState("")
    const[success,setSuccess]=useState("")
    const[error,setError]=useState("")
    // functiont to handle submit 
    const handlesubmit=async(e)=>{
      e.preventDefault()
      setLoading("please wait ..")
    //   create an empty digital envelope 
    const formdata= new FormData()
    formdata.append("product_name",product_name)
    formdata.append("product_description",product_description)
    formdata.append("product_cost",product_cost)
    formdata.append("product_photo",product_photo)
    try {
        const response= await axios.post("http://denniskifaru.alwaysdata.net/api/add_product",formdata)
        setSuccess(response.data.message)
        setLoading("")
    } catch (error) {
      setError(error.message)
        setLoading("");
        
    }
    }
  return (
    <div className='row justify-content-center mt-2'>
        <div className='col-md-8 card shadow p-4 bg-info'>
            <h1 className='text-dark'>Add products</h1>
            {/* bind the states  */}
           <h2 className='text-info'>{loading}</h2>
            <h2 className='text-success'>{success}</h2>
            <h2 className='text-danger'>{error}</h2>


            <form action="" onSubmit={handlesubmit}>
                <input type="text" placeholder='Enter product Name' className='form-control indie-flower-regular' onChange={(e)=>setProduct_Name(e.target.value)}/> <br />
                <textarea name="" id="" className='form-control indie-flower-regular' placeholder='Enter product description' onChange={(e)=>setProduct_Description(e.target.value)}></textarea><br />
                <input type="number" placeholder='🤑Enter product cost' className='form-control indie-flower-regular' onChange={(e)=>setProduct_Cost(e.target.value)}/><br />
                <input type="file" accept="image/*" className='form-control' onChange={(e)=>setProduct_Photo(e.target.files[0])} /><br />
                <button type='submit' className='btn btn-danger w-100' indie-flower-regular>Add Product</button>

            </form>
        </div>

    </div>
  )
}

export default Addproduct