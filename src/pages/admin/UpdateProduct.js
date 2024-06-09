import React, { useState, useEffect } from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [shipping, setShipping] = useState("")
    const [id, setId] = useState("")

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
            toast.error("Something went wrong")
        }
    }
    useEffect(() => {
        getAllCategory()
        // eslint-disable-next-line
    }, [])
    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`)
            if (data.success) {
                setName(data.singleProduct.name)
                setId(data.singleProduct._id)
                setDescription(data.singleProduct.description)
                setQuantity(data.singleProduct.quantity)
                setPrice(data.singleProduct.price)
                setShipping(data.singleProduct.shipping)
                setCategory(data.singleProduct.category._id)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    useEffect(() => {
        getSingleProduct()
        // eslint-disable-next-line
    }, [])

    //update product
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            photo && productData.append("photo", photo)
            productData.append("category", category)
            productData.append("shipping", shipping)
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
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
    const handleDelete = async () => {
        try {
            const answer = window.confirm("Are you sure want to delete")
            if (answer) {
                const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
                if (data.success) {
                    toast.success(data.message)
                }
            } else {
                return;
            }
            navigate("/dashboard/admin/products")
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
                        <h2 className='text-center'>Update Product</h2>
                        <div className="card p-3">
                            <Select
                                placeholder="Select category"
                                size="large"
                                showSearch
                                className='"form-select mb-3'
                                onChange={(value) => { setCategory(value) }}
                                value={category}
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
                                {photo ? (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)}
                                            alt="Error Uploading"
                                            style={{ height: "30vh" }}
                                        />

                                    </div>
                                ) : (
                                    <div className="text-center">
                                        {id ? (<>
                                            <img
                                                className="card-img-top"
                                                src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${id}`}
                                                alt={"Error Loading"}
                                                style={{ height: "30vh", width: "30vh" }}
                                            />
                                        </>) : (<>
                                            Image not found
                                        </>)}

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
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping === 1 ? "No" : "Yes"}
                                >
                                    <Select.Option value={1}>No</Select.Option>
                                    <Select.Option value={0}>Yes</Select.Option>
                                </Select>
                            </div>
                            <div>
                                <button className="btn btn-primary"
                                    onClick={handleUpdate}
                                >
                                    Update Product
                                </button>
                                <button className="btn btn-danger mx-2"
                                    onClick={handleDelete}
                                >
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct