import React from 'react'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
    return (
        <div className="list-group text-center fw-bold fs-5">
            <NavLink to="" className="list-group-item list-group-item-action active bg-dark bg-gradient list-group-item-light">
                <h2>User Dashboard</h2>
            </NavLink >
            <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action list-group-item-light">Profile</NavLink >
            <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action list-group-item-light">Oders</NavLink >
        </div>
    )
}

export default UserMenu
