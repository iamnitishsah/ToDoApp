import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api.js";
import {REFRESH_TOKEN, ACCESS_TOKEN} from "../constants.js";
import {useEffect, useState} from "react";

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(true);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try
        {
            const response = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (response.status === 200)
            {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true);
            }
            else
            {
                setIsAuthorized(false);
            }
        }
        catch (error)
        {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (now > tokenExpiration) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };


    return isAuthorized ? children : <Navigate to="/" />;
}

export default ProtectedRoute;