import React, { useState } from 'react'
import "../../style/register.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Layout from '../../component/Layout/Layout';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate()
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        answer: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterForm({ ...registerForm, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/register`, registerForm);
            if (res && res.data.success) {
                navigate("/login")
                toast.success(res.data.message)
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    return (
        <Layout>
            <div className='formContainer'>
                <form className='inputFormContainer' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <h2 style={{ color: "green" }}>Register Here</h2>
                    </div>
                    <div className="mb-3">
                        <input value={registerForm.name} onChange={handleChange} name='name' type="text" className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" placeholder='Enter Your Name' />
                    </div>
                    <div className="mb-3">
                        <input value={registerForm.email} onChange={handleChange} name='email' type="email" className="form-control" id="exampleInputEmail13" aria-describedby="emailHelp" placeholder='Enter Your Email' />
                    </div>
                    <div className="mb-3">
                        <input value={registerForm.password} onChange={handleChange} name='password' type="current-passwor" className="form-control" id="exampleInputEmail14" aria-describedby="emailHelp" placeholder='Enter Your Password' />
                    </div>
                    <div className="mb-3">
                        <input value={registerForm.phone} onChange={handleChange} name='phone' type="number" className="form-control" id="exampleInputEmail15" aria-describedby="emailHelp" placeholder='Enter Your Phone' />
                    </div>
                    <div className="mb-3">
                        <input value={registerForm.address} onChange={handleChange} name='address' type="text" className="form-control" id="exampleInputEmail16" aria-describedby="emailHelp" placeholder='Enter Your Adress' />
                    </div>
                    <div className="mb-3">
                        <input value={registerForm.answer} onChange={handleChange} name='answer' type="text" className="form-control" id="exampleInputEmail17" aria-describedby="emailHelp" placeholder='Enter Your Answer' />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register
