import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Carousel from './Carousel';
const marqueeItems = [
  { icon: "⚡", text: "Free delivery on orders above Ksh 5,000" },
  { icon: "📱", text: "Latest Smartphones & Accessories" },
  { icon: "💻", text: "Top Laptops & Computers" },
  { icon: "🔌", text: "Genuine Electronics — Warranty Included" },
  { icon: "🎧", text: "Premium Audio & Headphones" },
  { icon: "📺", text: "Smart TVs & Home Entertainment" },
  { icon: "🔋", text: "Power Banks & Charging Solutions" },
  { icon: "🖨️", text: "Printers, Scanners & Office Tech" },
  { icon: "⌚", text: "Smartwatches & Wearables" },
  { icon: "🛡️", text: "30-Day Returns — Shop with Confidence" },
]
const Getproduct = () => {
   let navigate = useNavigate();
    // declare our states here 
    const [loading,setLoading]=useState("")
    const [products,setProducts]=useState([])
    const [error,setError]=useState("")
    const [search,setSearch]=useState("");
    const [visibleCount, setVisibleCount] =useState(8);
    const filtered_products = products.filter((item) =>
      item.product_name.toLowerCase().includes(search.toLowerCase())||

    item.product_description.toLowerCase().includes(search.toLowerCase())
);

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
        <div className="marquee-wrapper mt-2">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <React.Fragment key={i}>
                <div className="marquee-item">
                  <span className="marquee-icon">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
                <span className="marquee-divider">✦</span>
              </React.Fragment>
            ))}
          </div>
        </div>
 
          <h1 className='text-primary indie-flower-regular'>Available products</h1>
        <div className='row justify-content-center mt-3 mb-3'>
          <input 
          type="search"
          className='form-control w-50'
          placeholder=' Search Products....'
          value={search} 
          onChange={(e)=>setSearch(e.target.value)}
          />

        </div>
        {/* bind the states  */}
        <h2 className='text-center text-warning'>{loading}</h2>
        <h2 className='texindie-flower-regulart-center text-danger'>{error}</h2>
        {filtered_products.slice(0, visibleCount).map((singleproduct) =>(
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
        <div className='text-center mt-3'>
          {visibleCount <filtered_products.length && (
          <button
          className='btn btn-primary'
          onClick={()=>setVisibleCount(visibleCount + 8)}
          >
            Load More 
          </button>  
          )}

        </div>
      </div>

    </div>
  )
}

export default Getproduct