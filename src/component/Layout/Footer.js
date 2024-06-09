import React from 'react'
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className='myfooter'>
            <h2>All Right Reserved @RK-Tech-Minds</h2>
            <div className="linkContainerFooter">
                <Link to="/about">About</Link>
                |
                <Link to="/contact">Contact</Link>
                |
                <Link to="/policy">Privacy Policy</Link>
            </div>
        </div>
    )
}

export default Footer
