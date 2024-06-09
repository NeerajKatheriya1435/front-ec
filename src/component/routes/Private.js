import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function Private() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/user-auth`);
            if (res.data?.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        };
        if (auth?.token) {
            authCheck();
        }
    }, [auth?.token])
    return ok ? <Outlet /> : <Spinner />
}


