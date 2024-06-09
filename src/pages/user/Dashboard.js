import React from 'react'
import Layout from '../../component/Layout/Layout'
import UserMenu from '../../component/Layout/UserMenu'
import { useAuth } from '../../context/authContext'

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className="container fluid m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card p-3">
                            <h3>User Name : {`${auth?.user.name}`}</h3>
                            <h3>User Email : {`${auth?.user.email}`}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
