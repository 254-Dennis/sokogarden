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

        // Listen for cart changes
        window.addEventListener('storage', updateCartCount);

        // Listen for login event fired by Signin
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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand fw-bold">🏎️ J-MOTORS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">🏠 Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/addproduct" className="nav-link">➕ Add Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">💻 Get Products</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link position-relative">
                                🛒 Cart
                                {cartCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-warning fw-bold">
                                        👤 Logged in as {user.username}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button onClick={logout} className="btn btn-danger btn-sm ms-2">
                                        🔓 Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/signin" className="nav-link">🔐 Signin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link">📝 Signup</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;