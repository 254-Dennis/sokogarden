import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Carousel from './Carousel';
const Getproduct = () => {
   let navigate = useNavigate();
    // declare our states here 
    const [loading,setLoading]=useState("")
    const [products,setProducts]=useState([])
    const [error,setError]=useState("")
    // function to get products 
    const getproducts=async ()=>{
      setLoading('please wait..')
      try {
        const response=await axios.get("http://denniskifaru.alwaysdata.net/api/getproducts")
        setProducts(response.data)
        setLoading("")
        
      } catch (error) {
        setError(error.message)
        setLoading("");
        
        
      }
    }
    // call the function 
    useEffect(()=>{
      getproducts()
    },[])
    console.log(products)
    const imagepath="http://denniskifaru.alwaysdata.net/static/images/"
  return (
    <div className='container-fluid'>
      <div className='row'>
        {/* carousel goes here  */}
        <Carousel />
        <h1 className='text-primary indie-flower-regular'>Available products</h1>
        {/* bind the states  */}
        <h2 className='text-center text-warning'>{loading}</h2>
        <h2 className='texindie-flower-regulart-center text-danger'>{error}</h2>
        {products.map(singleproduct=>(
          <div className="col-md-4  mb-3">
            <div className='card shadow h-100'>

            
            {/* card body goes here  */}
            <div className="card-body">
              {/* product name goes here  */}
              <h3 className='text-info bg-success'>{singleproduct.product_name}</h3>
            {/* image goes here  */}
            <img src={imagepath+ singleproduct.product_photo} alt=""  style={{ objectFit:"contain", height:"200px"}}/>
              {/* product description goes here  */}
              <p>{singleproduct.product_description}</p>
              {/* product cost goes here  */}
              <b className='text-success'>ksh{singleproduct.product_cost}</b><br />
              {/* purchase now button  */}
              <button className=' btn btn-primary w-100 indie-flower-regular' onClick={()=>navigate("/makepayment",{state:{singleproduct}})}>purchase now</button>
            </div>

          </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Getproduct