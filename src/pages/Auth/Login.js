

import React, { useState } from 'react'
import Layout from '../../component/Layout/Layout'
import "../../style/register.css"
import axios from "axios"
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [loginForm, setRegisterForm] = useState({
        email: "",
        password: ""
    })
    const [auth, setAuth] = useAuth()
    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterForm({ ...loginForm, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/login`, loginForm);
            if (res && res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state || "/")
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
                        <h2 style={{ color: "green" }}>Login Here</h2>
                    </div>
                    <div className="mb-3">
                        <input value={loginForm.email} onChange={handleChange} name='email' type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder='Enter Your Email' />
                    </div>
                    <div className="mb-3">
                        <input value={loginForm.password} onChange={handleChange} name='password' type="password" className="form-control" id="exampleInputPassword" aria-describedby="emailHelp" placeholder='Enter Your Password' />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-success">Login</button>
                        <button onClick={() => { navigate("/forgot-password") }} className="btn btn-success mx-2">Forgot Password</button>
                    </div>
                </form>

            </div>
        </Layout>
    )
}

export default Login

