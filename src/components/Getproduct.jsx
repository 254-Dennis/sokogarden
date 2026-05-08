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
    const [loading, setLoading] = useState("")
    const [products, setProducts] = useState([])
    const [error, setError] = useState("")
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [visibleCount, setVisibleCount] = useState(8);
    const [cartCount, setCartCount] = useState(
        JSON.parse(localStorage.getItem("cart"))?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0
    )

    const addToCart = (product) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || []
        const alreadyInCart = existingCart.find((item) => item.id === product.id)

        let updatedCart
        if (alreadyInCart) {
            // ✅ Product exists — increase quantity
            updatedCart = existingCart.map((item) =>
                item.id === product.id
                ? { ...item, quantity: (item.quantity || 1) + 1 }
                : item
            )
        } else {
            // ✅ New product — add with quantity 1
            updatedCart = [...existingCart, { ...product, quantity: 1 }]
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart))
        // ✅ Badge shows total quantity not just number of products
        setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0))
    }

    const filtered_products = products
      .filter((item) =>
        item.product_name.toLowerCase().includes(search.toLowerCase()) ||
        item.product_description.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "high") return b.product_cost - a.product_cost;
        if (sortOrder === "low") return a.product_cost - b.product_cost;
        return 0;
      });

    const getproducts = async () => {
      setLoading('please wait..')
      try {
        const response = await axios.get("http://denniskifaru.alwaysdata.net/api/getproducts")
        setProducts(response.data)
        setLoading("")
      } catch (error) {
        setError(error.message)
        setLoading("")
      }
    }

    useEffect(() => {
      getproducts()
    }, [])

    const imagepath = "http://denniskifaru.alwaysdata.net/static/images/"

  return (
    <div className='container-fluid'>
      <div className='row'>
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
          <div className='d-flex w-50 gap-2'>
            {/* 1. Search */}
            <input 
              type="search"
              className='form-control'
              placeholder='Search Products....'
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* 2. Sort */}
            <select
              className='form-control'
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="high">High to Low</option>
              <option value="low">Low to High</option>
            </select>
            {/* 3. Cart button */}
            <button
              className='btn btn-warning position-relative'
              onClick={() => navigate("/cart")}
            >
              🛒
              <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        <h2 className='text-center text-warning'>{loading}</h2>
        <h2 className='text-center text-danger'>{error}</h2>

        {filtered_products.slice(0, visibleCount).map((singleproduct) =>(
          <div className="col-md-4 mb-3" key={singleproduct.id}>
            <div className='card shadow h-100'>
              <div className="card-body">
                <h3 className='text-info bg-success'>{singleproduct.product_name}</h3>
                <img src={imagepath + singleproduct.product_photo} alt="" style={{ objectFit:"contain", height:"200px"}}/>
                <p>{singleproduct.product_description}</p>
                <b className='text-success'>ksh{singleproduct.product_cost}</b><br />
                <button className='btn btn-primary w-100 indie-flower-regular mt-2' onClick={()=>navigate("/makepayment",{state:{singleproduct}})}>purchase now</button>
                <button 
                  className='btn btn-warning w-100 mt-2 indie-flower-regular' 
                  onClick={() => addToCart(singleproduct)}>
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className='text-center mt-3'>
          {visibleCount < filtered_products.length && (
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