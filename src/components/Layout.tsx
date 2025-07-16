import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"

import { useAuth } from "@/context";

const Layout = () => {
    const { loginByToken, user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            if (token) {
                loginByToken(token).then(() => {
                    navigate('/dashboard');
                }).catch(() => {
                    navigate('/login');
                });
            } else {
                navigate('/login');
            }
        })()
    }, []);

    return <Outlet />
}

export default Layout;