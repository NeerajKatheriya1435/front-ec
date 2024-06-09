import React from 'react'
import { Helmet } from "react-helmet";
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';
const Layout = ({ children, title, description, keyword, author }) => {
    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "90vh" }}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </>
    )
}

// Layout.defaultProps = {
//     title: "E-Commerce-Website",
//     description: "website for a e-commerce business management",
//     keyword: "html,css,javascript,react",
//     author: "Neeraj Katheriya"
// }

export default Layout
