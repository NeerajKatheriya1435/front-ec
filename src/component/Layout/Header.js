import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { Badge } from 'antd';
import { useCart } from '../../context/cartContext';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart()
    const categories = useCategory()
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })
        localStorage.removeItem("auth");
        toast.success("Logout Successfully")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-secondary bg-gradient ">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="#"><FaShoppingCart style={{ fontSize: "2rem", margin: "5px" }} />  E-COMMERCE</Link >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                            <li className="nav-item my-2 mx-4">
                                <SearchInput />
                            </li>
                            <li className="nav-item ">
                                <NavLink to="/" className="nav-link text-light" >Home</NavLink >
                            </li>
                            <li className="nav-item dropdown">
                                <Link to="/nothing" className="nav-link dropdown-toggle text-light" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </Link>

                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to={"/category/all-category"} className="dropdown-item" >All Category</Link></li>
                                    {categories.map((cat) => (
                                        <li key={cat._id}><Link to={`/category/${cat.slug}`} className="dropdown-item" >{cat.name}</Link></li>
                                    ))}
                                </ul>
                            </li>

                            {(!auth.user) ? (<>
                                <li className="nav-item ">
                                    <NavLink to="/register" className="nav-link text-light">Register</NavLink >
                                </li>
                                <li className="nav-item ">
                                    <NavLink to="/login" className="nav-link text-light">Login</NavLink >
                                </li>
                            </>) : (<>
                                <li className="nav-item dropdown">
                                    <NavLink to="/nothing" className="nav-link dropdown-toggle text-light" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth?.user?.name}
                                    </NavLink>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink >
                                            <NavLink onClick={handleLogout} to="/login" className=" dropdown-item">Logout</NavLink >
                                        </li>
                                    </ul>

                                </li>
                            </>)}
                            <li className="nav-item ">
                                <Badge className="nav-link text-light" count={cart?.length} showZero>
                                    <NavLink
                                        to="/cart" className="nav-link text-light"
                                        style={{ fontSize: "1.2rem", fontWeight: 500 }}
                                    >Cart</NavLink >
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
