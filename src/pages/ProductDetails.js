import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useCart } from '../context/cartContext'

const ProductDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    const [product, setProduct] = useState({})
    const [related, setRelated] = useState([])

    useEffect(() => {
        if (params?.slug) getProductDetail();
        // eslint-disable-next-line
    }, [params?.slug])

    const getProductDetail = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`)
            if (data?.success) {
                setProduct(data?.singleProduct)
                getRelatedProductDetail(data?.singleProduct._id, data?.singleProduct.category._id)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getRelatedProductDetail = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/realted-product/${pid}/${cid}`)
            if (data?.success) {
                setRelated(data?.similarProduct)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout>
            <div className="row container">
                <div className="col-md-6 d-flex justify-content-center align-items-center"
                    style={{ height: "60vh" }}
                >

                    {product._id ? (<>
                        <img
                            className="card-img-top"
                            src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${product._id}`}
                            alt={product.name}
                            style={{ height: "50vh", width: "50vh", borderRadius: "5px" }}
                        />
                    </>) : (<>
                        Image Not Found
                    </>)}


                </div>
                <div className="col-md-6 mt-4">
                    <h1>Product Details</h1>
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : ${product.price}</h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button className='btn btn-secondary mt-2'>Add to Cart</button>
                </div>
            </div>
            <hr />
            <div className="row container mx-4">
                <h3>Similar Products</h3>
                {related.length < 1 ? (
                    <h2 className='text-center'>No Similar Product Found</h2>
                ) : (<div className="d-flex flex-wrap  align-items-center">
                    {related.map((prod) => (
                        <div key={prod._id} className="card m-2" style={{ width: '18rem' }}>
                            {prod._id ? (<>
                                <img
                                    className="card-img-top"
                                    src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${prod._id}`}
                                    alt={prod.name}
                                    style={{ height: "40vh", width: "100%" }}
                                />
                            </>) : (<>
                                <img
                                    className="card-img-top"
                                    src={`https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg`}
                                    alt={prod.name}
                                    style={{ height: "40vh", width: "100%" }}
                                />
                            </>)}
                            <div className="card-body"
                                style={{ backgroundColor: "ThreeDFace" }}
                            >
                                <h5 className="card-title">{prod.name}</h5>
                                <p className="card-text">{prod.description}</p>
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
                </div>)}

            </div>
        </Layout>
    )
}

export default ProductDetails