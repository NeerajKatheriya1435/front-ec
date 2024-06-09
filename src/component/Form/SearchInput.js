import React from 'react'
import { useSearch } from '../../context/searchContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {
    const navigate = useNavigate()
    const [values, setValues] = useSearch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search-product/${values.keywords}`)
            setValues({ ...values, result: data })
            navigate("/search-product")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <div>
            <form className="d-flex" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                    value={values.keywords}
                    onChange={(e) => setValues({ ...values, keywords: e.target.value })}
                    style={{ width: "25vw" }}
                />
                <button className="btn btn-outline-warning" type="submit">Search</button>
            </form>

        </div>
    )
}

export default SearchInput