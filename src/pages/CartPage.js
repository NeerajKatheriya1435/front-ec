import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout/Layout'
import { useCart } from '../context/cartContext'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast from 'react-hot-toast'

const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState("")
    const navigate = useNavigate()
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleRemove = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
            if (data?.clientToken) {
                setClientToken(data?.clientToken)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getToken()
    }, [auth?.token])

    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, { nonce, cart })
            if (data) {
                setLoading(false)
                localStorage.removeItem("cart")
                setCart([])
                navigate("/dashboard/user/orders")
                toast.success("Payment completed successfully")
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <Layout>
            <div className="container mt-2">
                {auth?.user?.name ? (<>
                    <h2 className='text-center'>Hello {auth?.user.name}</h2>
                </>) : (<>
                    <h2 className='text-center'>Hello Guest</h2>
                </>)}
                <h5 className='text-center'>You have {cart?.length} items in your cart</h5>
            </div>
            <div className="d-flex justify-content-around">
                {!cart?.length ? (<>
                    <h4 className='text-center m-4'>No Items to checkout</h4>
                </>) : (<>
                    <div className="col-md-6">
                        {cart?.map((prod) => (
                            <div key={prod._id} className="row card d-flex flex-row m-2 mx-4 container">
                                <div className="col-md-4">
                                    <img
                                        className="card-img-top mx-4"
                                        src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${prod._id}`}
                                        alt={prod.name}
                                        style={{ height: "100%", width: "25vh" }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <h3 className="card-title m-2">{prod.name}</h3>
                                    <p className="card-text m-2">Description : {prod.description}</p>
                                    <p className="card-text m-2">Price : {prod.price}</p>
                                    <button
                                        onClick={() => { handleRemove(prod._id) }}
                                        className="btn btn-danger my-2">Remove Item</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-3 card text-center pt-2 mb-2">
                        <h3>Cart Summary</h3>
                        <p>Total | Checkout | Payemnt</p>
                        <hr />
                        <h4>Total : {totalPrice()} </h4>
                        {(auth?.user && auth?.token) ? (<>
                            <div className='text-center'>
                                <h5>Current Address : {auth?.user.address}</h5>
                                <button className="btn btn-outline-warning w-50"
                                    onClick={() => { navigate("/dashboard/user/profile") }}
                                >Change Address</button>
                            </div>
                        </>) : (<>
                            <div className='text-center'>
                                <button className="btn btn-outline-warning "
                                    onClick={() => { navigate("/login", { state: "/cart" }) }}
                                >Please Login to Checkout</button>
                            </div>
                        </>)}
                        <div className="mt-2">
                            {(!clientToken || !cart?.length) ? ("") : (<>
                                <DropIn
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: 'vault'
                                        }
                                    }}
                                    onInstance={
                                        instance => setInstance(instance)
                                    }
                                />
                                <button className="btn btn-outline-success m-2"
                                    onClick={handlePayment}
                                    disabled={!auth?.user?.address || !instance || loading}
                                >{loading ? "Processing" : "Make Payment"}</button>
                            </>)}
                        </div>
                    </div>
                </>)}

            </div>

        </Layout>
    )
}

export default CartPage