import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([])
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-all-product`)
            if (data?.success) {
                setProducts(data.allProduct)
            }
        } catch (error) {
            console.log(error)
            toast.error("Somethimg went wrong")
        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <Layout>
            <div className="container fluid m-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card p-3 text-center">
                            <h2> All Product List</h2>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {products.map((prod) => (
                                <Link key={prod._id} to={`/dashboard/admin/update-product/${prod.slug}`}
                                    className='productLink'
                                >
                                    <div className="card m-2" style={{ width: '18rem' }}>
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
                                        <div className="card-body">
                                            <h5 className="card-title">{prod.name}</h5>
                                            <p className="card-text">{prod.description.substring(0, 30)}...</p>
                                            <p className="card-text">{prod.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products