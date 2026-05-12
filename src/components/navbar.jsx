// components/Navbar.jsx
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();

    const loadUser = () => {
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        setUser(loggedUser);
    };

    useEffect(() => {
        loadUser();

        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartCount(cart.length);
        };

        updateCartCount();
        window.addEventListener('storage', updateCartCount);
        window.addEventListener('userLoggedIn', loadUser);

        return () => {
            window.removeEventListener('storage', updateCartCount);
            window.removeEventListener('userLoggedIn', loadUser);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/signin");
    };

    return (
        <nav style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
            borderBottom: "3px solid #ff6600",
            padding: "0 16px",
            boxShadow: "0 4px 15px rgba(255, 102, 0, 0.3)"
        }} className="navbar navbar-expand-lg">
            <div className="container-fluid">

                {/* Logo */}
                <Link to="/" style={{
                    color: "#ff6600",
                    fontWeight: "900",
                    fontSize: "22px",
                    textDecoration: "none",
                    letterSpacing: "1px"
                }}>
                    ⚡ Jounior Electronics
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    style={{ borderColor: "#ff6600" }}
                >
                    <span style={{ color: "#ff6600", fontSize: "20px" }}>☰</span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    {/* Left Links */}
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link to="/" style={linkStyle}>🏠 Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/getproduct" style={linkStyle}>💻 Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/addproduct" style={linkStyle}>➕ Add Product</Link>
                        </li>
                    </ul>

                    {/* Right Links */}
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0 align-items-center">

                        {/* Cart */}
                        <li className="nav-item me-2">
                            <Link to="/cart" style={linkStyle} className="position-relative">
                                🛒 Cart
                                {cartCount > 0 && (
                                    <span style={{
                                        position: "absolute",
                                        top: "-6px",
                                        right: "-10px",
                                        backgroundColor: "#ff6600",
                                        color: "white",
                                        borderRadius: "50%",
                                        padding: "1px 6px",
                                        fontSize: "11px",
                                        fontWeight: "bold"
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>

                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span style={{
                                        color: "#ff6600",
                                        fontWeight: "bold",
                                        padding: "8px 12px",
                                        backgroundColor: "rgba(255,102,0,0.1)",
                                        borderRadius: "20px",
                                        border: "1px solid #ff6600",
                                        fontSize: "14px"
                                    }}>
                                        👤 {user.username}
                                    </span>
                                </li>
                                <li className="nav-item ms-2">
                                    <button onClick={logout} style={{
                                        backgroundColor: "transparent",
                                        border: "1px solid #ff4444",
                                        color: "#ff4444",
                                        borderRadius: "20px",
                                        padding: "5px 14px",
                                        cursor: "pointer",
                                        fontSize: "13px",
                                        transition: "all 0.2s"
                                    }}
                                    onMouseOver={e => {
                                        e.target.style.backgroundColor = "#ff4444"
                                        e.target.style.color = "white"
                                    }}
                                    onMouseOut={e => {
                                        e.target.style.backgroundColor = "transparent"
                                        e.target.style.color = "#ff4444"
                                    }}>
                                        🔓 Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/signin" style={linkStyle}>🔐 Signin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" style={{
                                        backgroundColor: "#ff6600",
                                        color: "white",
                                        padding: "6px 16px",
                                        borderRadius: "20px",
                                        textDecoration: "none",
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        marginLeft: "8px"
                                    }}>
                                        📝 Signup
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const linkStyle = {
    color: "#cccccc",
    textDecoration: "none",
    padding: "8px 12px",
    fontSize: "14px",
    transition: "color 0.2s"
}

export default Navbar;