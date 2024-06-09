import React, { useState, useEffect } from 'react'
import Layout from '../component/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../component/Prices'
import { useCart } from '../context/cartContext'

const HomePage = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product-perpage/${page}`)

            setLoading(false)
            if (data?.success) {
                setProducts(data.perPageProduct)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error("Somethimg went wrong")
        }
    }
    useEffect(() => {
        getAllCategory()
        getTotal()
    }, [])

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
    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter(cat => cat !== id)
        }
        setChecked(all)
    }
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts()
        // eslint-disable-next-line
    }, [checked.length, radio.length])
    useEffect(() => {
        if (checked.length || radio.length) filterProduct()
        // eslint-disable-next-line
    }, [checked, radio])

    // get total count
    const getTotal = async (req, res) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-count-product`)
            if (data.success) {
                setTotal(data.total)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore()
        // eslint-disable-next-line
    }, [page])

    //to load more products
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product-perpage/${page}`)
            setLoading(false)
            if (data?.success) {
                setProducts([...products, ...data?.perPageProduct])
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error("Somethimg went wrong")
        }
    }

    //products by filter
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/get-filter-product`, { checked, radio })
            if (data?.success) {
                setProducts(data.filterProducts)
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
                        <h3>Filter by Category</h3>
                        <div className="d-flex flex-column">
                            {category.map((cat) => (
                                <Checkbox key={cat._id}
                                    onChange={(e) => handleFilter(e.target.checked, cat._id)}
                                    className='my-1 fs-5 mx-4'
                                >
                                    {cat.name}
                                </Checkbox>
                            ))}
                        </div>
                        <h3 className='my-4'>Filter by Price</h3>
                        <div className="d-flex flex-column">
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {Prices.map((price) => (
                                    <div key={price._id}>
                                        <Radio className='my-1 fs-5 mx-4' value={price.array} >{price.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <button className="btn btn-secondary my-2"
                            onClick={() => window.location.reload()}
                        >Clear Filter</button>
                    </div>
                    <div className="col-md-9">
                        <div className="card p-3">
                            <h2>All Products</h2>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {products.map((prod) => (
                                <div key={prod._id} className="card m-2" style={{ width: '18rem' }}>
                                    <img
                                        className="card-img-top"
                                        src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${prod._id}`}
                                        alt={prod.name}
                                        style={{ height: "40vh", width: "100%" }}
                                    />
                                    <div className="card-body"
                                        style={{ backgroundColor: "ThreeDFace" }}
                                    >
                                        <h5 className="card-title">{prod.name}</h5>
                                        <p className="card-text">{prod.description.substring(0, 30)}...</p>
                                        <p className="card-text">Price: ${prod.price}</p>
                                        <button onClick={() => navigate(`/product/${prod.slug}`)} className="btn btn-primary mx-1">More Details</button>
                                        <button
                                            onClick={() => {
                                                setCart([...cart, prod]);
                                                localStorage.setItem("cart", JSON.stringify([...cart, prod]))
                                                toast.success("Item added to cart")
                                            }}
                                            to="" className="btn btn-secondary mx-1">Add to Cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {products && products.length < total && (
                            <button className='btn btn-primary'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default HomePage
