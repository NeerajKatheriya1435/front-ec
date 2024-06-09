import React, { useEffect, useState } from 'react'
import "../../style/register.css"
import axios from "axios"
import toast from 'react-hot-toast';
import Layout from '../../component/Layout/Layout'
import UserMenu from '../../component/Layout/UserMenu'
import { useAuth } from '../../context/authContext';

const Profile = () => {

    const [auth, setAuth] = useAuth()
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterForm({ ...registerForm, [name]: value })
    }

    useEffect(() => {
        const { name, email, phone, address } = auth?.user
        setRegisterForm({
            name: name,
            email: email,
            phone: phone,
            address: address
        })
        // eslint-disable-next-line
    }, [auth?.user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/user/update-profile`, registerForm);
            if (res && res.data.success) {
                setAuth({ ...auth, user: res.data.updateUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = res.data.updateUser
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success(res.data.message)
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.error("Error while updating profile:", error);
        }
    }
    return (
        <Layout>
            <div className="container fluid m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card p-3">
                            <div className='formContainer'>
                                <form className='inputFormContainer' onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <h2 style={{ color: "green" }}>User Details</h2>
                                    </div>
                                    <div className="mb-3">
                                        <input value={registerForm.name} onChange={handleChange} name='name' type="text" className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" placeholder='Enter Your Name' />
                                    </div>
                                    <div className="mb-3">
                                        <input value={registerForm.email} onChange={handleChange} name='email' type="email" className="form-control" id="exampleInputEmail13" aria-describedby="emailHelp" placeholder='Enter Your Email' disabled />
                                    </div>
                                    <div className="mb-3">
                                        <input value={registerForm.phone} onChange={handleChange} name='phone' type="number" className="form-control" id="exampleInputEmail15" aria-describedby="emailHelp" placeholder='Enter Your Phone' />
                                    </div>
                                    <div className="mb-3">
                                        <input value={registerForm.address} onChange={handleChange} name='address' type="text" className="form-control" id="exampleInputEmail16" aria-describedby="emailHelp" placeholder='Enter Your Adress' />
                                    </div>
                                    <button type="submit" className="btn btn-success">Update Details</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
