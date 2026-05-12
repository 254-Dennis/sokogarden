import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Makepayment = () => {
    const { singleproduct } = useLocation().state || {}
    const imagepath = "http://denniskifaru.alwaysdata.net/static/images/"

    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading("Please wait... Check your phone for M-Pesa prompt 📲")
        setSuccess("")
        setError("")

        // Validate phone number
        if (!phone.startsWith("254") || phone.length !== 12) {
            setError("Please enter a valid phone number in format 254XXXXXXXXX")
            setLoading("")
            return
        }

        const formdata = new FormData()
        formdata.append("phone", phone)
        formdata.append("amount", singleproduct.product_cost)

        try {
            const response = await axios.post(
                "http://denniskifaru.alwaysdata.net/api/mpesa_payment",
                formdata
            )
            setSuccess(response.data.message || "✅ M-Pesa prompt sent! Enter your PIN to complete payment.")
            setLoading("")
        } catch (error) {
            setError(error.response?.data?.message || error.message)
            setLoading("")
        }
    }

    if (!singleproduct) {
        return <h3 className="text-center text-danger mt-5">No product selected.</h3>
    }

    return (
        <div className="row justify-content-center mt-3">
            <h1 className="text-primary indie-flower-regular text-center">
                💳 Lipa na M-Pesa
            </h1>
            <div className="col-md-6 card shadow p-4">

                <h4 className="text-info text-start indie-flower-regular">
                    {singleproduct.product_name}
                </h4>

                <img
                    src={imagepath + singleproduct.product_photo}
                    alt={singleproduct.product_name}
                    style={{ height: "350px", objectFit: "cover" }}
                />

                <p className="text-start mt-2">{singleproduct.product_description}</p>
                <b className="text-start text-danger">Ksh: {singleproduct.product_cost}</b>

                <br />

                {loading && <h5 className="text-success">{loading}</h5>}
                {success && <h5 className="text-warning">{success}</h5>}
                {error   && <h5 className="text-danger">{error}</h5>}

                <form onSubmit={handlesubmit}>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter phone 254XXXXXXXXX"
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <br />
                    <button type="submit" className="btn btn-success w-100 indie-flower-regular">
                        💚 Make Payment
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Makepayment