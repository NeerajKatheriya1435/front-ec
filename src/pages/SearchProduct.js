import React from 'react'
import { useSearch } from '../context/searchContext'
import { useNavigate } from 'react-router-dom'
import Layout from '../component/Layout/Layout'
import { useCart } from '../context/cartContext'
import toast from 'react-hot-toast'

const SearchProduct = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    const [values, setValues] = useSearch();
    return (
        <Layout>
            <div >
                {values?.result.length === 0 ? (
                    <>
                        <h2 className="text-center my-2">Product Not Found</h2>
                    </>
                ) : (<>
                    <h2 className="text-center my-2">Found Products</h2>
                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                        {values?.result.map((prod) => (
                            <div key={prod._id} to={`/dashboard/admin/update-product/${prod.slug}`}
                                className='productLink'
                            >
                                <div className="card m-2" style={{ width: '18rem' }}>
                                    <img
                                        className="card-img-top"
                                        src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${prod._id}`}
                                        alt={prod.name}
                                        style={{ height: "40vh", width: "100%" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{prod.name}</h5>
                                        <p className="card-text">{prod.description.substring(0, 30)}...</p>
                                        <p className="card-text">{prod.price}</p>
                                        <button onClick={() => navigate(`/product/${prod.slug}`)} className="btn btn-primary mx-1">More Details</button>
                                        <button
                                            onClick={() => {
                                                setCart([...cart, prod])
                                                toast.success("Item added to cart")
                                            }}
                                            to="" className="btn btn-secondary mx-1">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>)}
            </div>
        </Layout>
    )
}

export default SearchProduct