import React from 'react'
import { NavLink } from 'react-router-dom'
const AdminMenu = () => {
    return (

        <div className="list-group text-center fw-bold fs-5">
            <NavLink to="" className="list-group-item list-group-item-action active bg-dark bg-gradient list-group-item-light">
                <h2>Admin Pannel</h2>
            </NavLink >
            <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action list-group-item-light ">Create-Category</NavLink >
            <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action list-group-item-light">Create-Product</NavLink >
            <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action list-group-item-light">Products</NavLink >
            <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action list-group-item-light">Orders</NavLink >
            <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action list-group-item-light">Users</NavLink >
        </div>

    )
}

export default AdminMenu
