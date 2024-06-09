import React from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import { useAuth } from '../../context/authContext'

const AdminDash = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className="container fluid m-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card p-3">
                            <h3>Admin Name : {`${auth?.user.name}`}</h3>
                            <h3>Admin Email : {`${auth?.user.email}`}</h3>
                            <h3>Admin Number : {`${auth?.user.phone}`}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDash
