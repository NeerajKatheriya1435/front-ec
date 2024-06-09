import React, { useState, useEffect } from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [shipping, setShipping] = useState(null)

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/fetch-all-category`)
            if (data?.success) {
                setCategories(data.allCategory)
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
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)
            productData.append("shipping", shipping)
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-new-product`,
                productData)
            if (data?.success) {
                toast.success(data.message)
                navigate("/dashboard/admin/products")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
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
                        <h2 className='text-center'>Create Product</h2>
                        <div className="card p-3">
                            <Select
                                placeholder="Select category"
                                size="large"
                                showSearch
                                className='"form-select mb-3'
                                onChange={(value) => { setCategory(value) }}
                            >
                                {categories.map((cat) => {
                                    return <Select.Option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </Select.Option>
                                })}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary">
                                    {photo ? photo.name : "Upload Image"}
                                    <input type="file"
                                        name='photo'
                                        accept='image/*'
                                        onChange={(e) => { setPhoto(e.target.files[0]) }}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)}
                                            alt="Error Uploading"
                                            style={{ height: "30vh" }}
                                        />

                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    value={name}
                                    className='form-control'
                                    placeholder='Enter name of Product'
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    value={description}
                                    className='form-control'
                                    placeholder='Enter description of Product'
                                    onChange={(e) => { setDescription(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="number"
                                    value={quantity}
                                    className='form-control'
                                    placeholder='Enter quantity of Product'
                                    onChange={(e) => { setQuantity(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="number"
                                    value={price}
                                    className='form-control'
                                    placeholder='Enter price of Product'
                                    onChange={(e) => { setPrice(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <Select placeholder="Select shipping"
                                    size="large"
                                    showSearch
                                    className='"form-select mb-3'
                                    onChange={(value) => { setShipping(value) }}>
                                    <Select.Option value='1'>No</Select.Option>
                                    <Select.Option value='0'>Yes</Select.Option>
                                </Select>
                            </div>
                            <div>
                                <button className="btn btn-primary"
                                    onClick={handleCreate}
                                >
                                    Create Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
