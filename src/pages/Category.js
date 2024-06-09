import React from 'react'
import Layout from '../component/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Category = () => {
    const categories = useCategory()
    return (
        <Layout
            title="Category-E-Commerce"
            description="Kuch Bhi"
            keyword="Kuch Bhi"
        >
            <div className="row mt-2">
                <h2 className='text-center'>All Categories</h2>
                {categories.map((cat) => (
                    <div key={cat._id} className="col-md-2 text-center">
                        <Link to={`/category/${cat.slug}`} className="btn btn-outline-primary mt-2">
                            {cat.name}
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Category
