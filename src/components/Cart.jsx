import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const navigate = useNavigate()
    const imagepath = "http://denniskifaru.alwaysdata.net/static/images/"

    // load cart from localStorage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || []
        setCartItems(savedCart)
    }, [])

    // remove single item from cart
    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id)
        setCartItems(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
    }

    // clear entire cart
    const clearCart = () => {
        localStorage.removeItem("cart")
        setCartItems([])
    }

    // increase quantity
    const increaseQty = (id) => {
        const updatedCart = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        )
        setCartItems(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
    }

    // decrease quantity
    const decreaseQty = (id) => {
        const updatedCart = cartItems.map((item) =>
            item.id === id && (item.quantity || 1) > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        setCartItems(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
    }

    // ✅ total multiplied by quantity
    const total = cartItems.reduce((sum, item) => 
        sum + (Number(item.product_cost) * (item.quantity || 1)), 0)

    return (
        <div className='container mt-3'>
            <h1 className='text-primary indie-flower-regular'>🛒 My Cart</h1>

            {cartItems.length === 0 ? (
                <div className='text-center mt-5'>
                    <h3 className='text-danger'>Your cart is empty!</h3>
                    <button 
                        className='btn btn-primary mt-3'
                        onClick={() => navigate("/")}>
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div className='card shadow mb-3 p-3' key={item.id}>
                            <div className='row align-items-center'>
                                {/* Image */}
                                <div className='col-md-2'>
                                    <img 
                                        src={imagepath + item.product_photo} 
                                        alt={item.product_name}
                                        style={{ height: "80px", objectFit: "contain", width: "100%" }}
                                    />
                                </div>
                                {/* Name and description */}
                                <div className='col-md-4'>
                                    <h5 className='text-info'>{item.product_name}</h5>
                                    <p className='text-muted'>{item.product_description}</p>
                                </div>
                                {/* Price and quantity */}
                                <div className='col-md-3'>
                                    <b className='text-success'>Ksh {item.product_cost}</b><br/>
                                    {/* ✅ Quantity controls */}
                                    <div className='d-flex align-items-center gap-2 mt-1'>
                                        <button 
                                            className='btn btn-sm btn-outline-secondary'
                                            onClick={() => decreaseQty(item.id)}>
                                            ➖
                                        </button>
                                        <span><b>{item.quantity || 1}</b></span>
                                        <button 
                                            className='btn btn-sm btn-outline-secondary'
                                            onClick={() => increaseQty(item.id)}>
                                            ➕
                                        </button>
                                    </div>
                                    {/* ✅ Subtotal per item */}
                                    <small className='text-danger'>
                                        Subtotal: Ksh {Number(item.product_cost) * (item.quantity || 1)}
                                    </small>
                                </div>
                                {/* Buttons */}
                                <div className='col-md-3'>
                                    <button 
                                        className='btn btn-danger w-100'
                                        onClick={() => removeFromCart(item.id)}>
                                        🗑️ Remove
                                    </button>
                                    <button 
                                        className='btn btn-primary w-100 mt-2'
                                        onClick={() => navigate("/makepayment", { state: { singleproduct: item } })}>
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Total and actions */}
                    <div className='card shadow p-3 mt-3'>
                        <h4 className='text-end text-danger'>Total: Ksh {total}</h4>
                        <div className='d-flex gap-2'>
                            <button 
                                className='btn btn-success w-100 indie-flower-regular'
                                onClick={() => navigate("/")}>
                                Continue Shopping
                            </button>
                            <button 
                                className='btn btn-danger w-100 indie-flower-regular'
                                onClick={clearCart}>
                                🗑️ Clear Cart
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart