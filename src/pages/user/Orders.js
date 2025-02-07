import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout'
import UserMenu from '../../component/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/authContext'
import moment from "moment"
const Orders = () => {
    const [auth, setAuth] = useAuth()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (auth?.token) getOrders()
        // eslint-disable-next-line
    }, [auth?.token])
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/user-orders`)
            if (data) {
                setOrders(data)
            }
        } catch (error) {
            console.log(error)
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
                            <h1 className='text-center'>All Orders</h1>
                            {
                                orders.map((order, index) => (
                                    <div className='border border-secondary rounded shadow m-2'>
                                        <div className="">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="col">Sr. No.</th>
                                                        <th className="col">Status</th>
                                                        <th className="col">Buyer</th>
                                                        <th className="col">Orders</th>
                                                        <th className="col">Payment</th>
                                                        <th className="col">Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{order?.status}</td>
                                                        <td>{order?.buyer?.name}</td>
                                                        <td>{moment(order?.createdAt).fromNow()}</td>
                                                        <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                                                        <td>{order?.product?.length}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="">
                                            {order?.product?.map((prod) => (
                                                <div key={prod._id} className="row m-2 border rounded">
                                                    <div className="col-md-4">
                                                        <img
                                                            className="card-img-top mx-4"
                                                            src={`${process.env.REACT_APP_API}/api/v1/product/get-product-photo/${prod._id}`}
                                                            alt={prod.name}
                                                            style={{ height: "100%", width: "25vh" }}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <h3 className="card-title m-2">{prod.name}</h3>
                                                        <p className="card-text m-2">Description : {prod.description.substring(0, 30)}...</p>
                                                        <p className="card-text m-2">Price : {prod.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            }
                        </div >
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
