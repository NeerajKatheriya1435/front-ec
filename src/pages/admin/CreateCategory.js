import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import InputCategory from '../../component/Form/InputCategory';
import { Modal } from "antd"
const CreateCategory = () => {
    const [category, setCategory] = useState([]);
    const [visibility, setVisibility] = useState(false)
    const [name, setName] = useState("")
    const [seleted, setSeleted] = useState(null);
    const [updateName, setUpdateName] = useState("")
    //create new category
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/category//create-new-category`, { name })
            if (res?.data.success) {
                toast.success(`${name} category is created`)
                getAllCategory()
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/fetch-all-category`)
            if (data?.success) {
                setCategory(data.allCategory)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }
    useEffect(() => {
        getAllCategory()
    }, [])
    // to update category
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${seleted._id}`, { newName: updateName })
            if (data.success) {
                toast.success(data.message)
                setSeleted(null)
                setUpdateName("")
                setVisibility(false)
                getAllCategory()
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    //to delete category
    const handleDelete = async (cat_id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${cat_id}`)
            if (data.success) {
                toast.success(data.message)
                setSeleted(null)
                setUpdateName("")
                setVisibility(false)
                getAllCategory()
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout>
            <div className="container fluid m-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card p-3">
                            <h2 className='m-2'>Manage Category</h2>
                            <InputCategory handleSubmit={handleSubmit} value={name} setValue={setName} />
                            <table className="table mt-2">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Edit Act</th>
                                        <th scope="col">Delete Act</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.map((cat => (
                                        <tr key={cat._id}>
                                            <td >{cat.name}</td>
                                            <td><button
                                                className='btn btn-primary'
                                                onClick={() => {
                                                    setVisibility(true);
                                                    setUpdateName(cat.name)
                                                    setSeleted(cat)
                                                }}
                                            >Edit</button></td>
                                            <td><button
                                                className='btn btn-danger'
                                                onClick={() => { handleDelete(cat._id) }}
                                            >Delete</button></td>
                                        </tr>
                                    )))}
                                </tbody>
                            </table>
                            <Modal onCancel={() => setVisibility(false)} footer={null} open={visibility}>
                                <InputCategory value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
