
import React, { useState } from 'react'
import Layout from '../../component/Layout/Layout'
import "../../style/register.css"
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
    const navigate = useNavigate();
    const [loginForm, setRegisterForm] = useState({
        email: "",
        newPassword: "",
        answer: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterForm({ ...loginForm, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/forgot-password`, loginForm);
            console.log(res)
            if (res && res.data.success) {
                toast.success(res.data.message)
                navigate("/login")
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.error("Error submitting login:", error);
        }
    }

    return (
        <Layout>
            <div className='formContainer'>
                <form className='inputFormContainer' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <h2 style={{ color: "green" }}>Forgot Password</h2>
                    </div>
                    <div className="mb-3">
                        <input value={loginForm.email} onChange={handleChange} name='email' type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder='Enter Your Email' />
                    </div>
                    <div className="mb-3">
                        <input value={loginForm.newPassword} onChange={handleChange} name='newPassword' type="password" className="form-control" id="exampleInputPassword" aria-describedby="emailHelp" placeholder='Enter Your Password' />
                    </div>
                    <div className="mb-3">
                        <input value={loginForm.answer} onChange={handleChange} name='answer' type="text" className="form-control" id="exampleInputPassword7" aria-describedby="emailHelp" placeholder='Enter Your Answer' />
                    </div>
                    <div className="mb-3">
                        <button type='submit' className="btn btn-success mx-2">Reset Password</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPass
