import React from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
const AllUsers = () => {
    return (
        <Layout>
            <div className="container fluid m-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card p-3">
                            <h1>All Users</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AllUsers
