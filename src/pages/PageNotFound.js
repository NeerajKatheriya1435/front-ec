import React from 'react'
import Layout from '../component/Layout/Layout'
import { Link } from "react-router-dom";
import "../style/pageNotFound.css"

const PageNotFound = () => {
    return (
        <Layout>
            <div>
                <div className="pageNotFound">
                    <h1>404</h1>
                    <h2>Oops! Page Not Found</h2>
                    <Link to="/">Go Back</Link>
                </div>
            </div>
        </Layout>
    )
}

export default PageNotFound
