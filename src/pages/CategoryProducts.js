import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useCart } from '../context/cartContext'

const CategoryProducts = () => {
    const params = useParams()
    const [cart, setCart] = useCart()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])

    useEffect(() => {
        if (params?.slug) getProductsByCategory()
        // eslint-disable-next-line
    }, [params?.slug])

    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`)
            if (data?.success) {
                setProducts(data?.catProducts)
                console.log(data.catProducts)
                setCategory(data?.category)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }
    return (
        <Layout>
            <div className="container mt-2">
                <h2 className='text-center'>Category - {category?.name}</h2>
                <h5 className='text-center'>Total Result - {products?.length}</h5>
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {products?.map((prod) => (
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
                                        setCart([...cart, prod])
                                        toast.success("Item added to cart")
                                    }}
                                    to="" className="btn btn-secondary mx-1">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProducts