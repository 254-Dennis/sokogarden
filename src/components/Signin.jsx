import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [strength, setStrength] = useState("")

    const navigate = useNavigate()

    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading("Please wait...")
        setError("")
        setSuccess("")

        const formdata = new FormData()
        formdata.append("email", email)
        formdata.append("password", password)

        try {
            const response = await axios.post(
                "http://denniskifaru.alwaysdata.net/api/signin",
                formdata
            )

            console.log("Response data:", response.data)

            setSuccess(response.data.message)
            setLoading("")

            // Save user to localStorage
            const user = {
                username:
                    response.data.username ||
                    response.data.user?.username ||
                    email.split("@")[0]
            }

            localStorage.setItem("user", JSON.stringify(user))

            // Save token if available
            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
            }

            // Tell Navbar to reload the user immediately
            window.dispatchEvent(new Event("userLoggedIn"))

            navigate("/")

        } catch (error) {
            console.log("Full error:", error)
            console.log("Response:", error.response)
            setError(error.response?.data?.message || error.message)
            setLoading("")
        }
    }

    const checkPasswordStrength = (password) => {
        if (password.length < 4) {
            setStrength("weak")
        } else if (password.length < 8) {
            setStrength("medium")
        } else {
            setStrength("strong")
        }
    }

    return (
        <div className="full-height">
            <div className="row mt-2 justify-content-center">
                <div className="col-md-6 card shadow bg-success">

                    <h1>Sign In 👤</h1>

                    {loading && <h2 className="text-warning">{loading}</h2>}
                    {success && <h2 className="text-success">{success}</h2>}
                    {error   && <h2 className="text-danger">{error}</h2>}

                    <form onSubmit={handlesubmit}>

                        <input
                            type="email"
                            placeholder="📧 Enter Email"
                            className="form-control indie-flower-regular"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />

                        <input
                            type="password"
                            placeholder="🔒 Enter Password"
                            className="form-control indie-flower-regular"
                            onChange={(e) => {
                                setPassword(e.target.value)
                                checkPasswordStrength(e.target.value)
                            }}
                        />
                        <br />

                        {password && (
                            <p style={{
                                color:
                                    strength === "weak"   ? "red" :
                                    strength === "medium" ? "orange" :
                                    "yellow"
                            }}>
                                Password Strength: {strength}
                            </p>
                        )}

                        <button type="submit" className="btn btn-primary w-100">
                            Sign In
                        </button>

                        <p>
                            Don't have an account?{" "}
                            <Link to="/Signup">Signup</Link>
                        </p>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signin