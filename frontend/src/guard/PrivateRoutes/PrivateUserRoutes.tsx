import routes from "@router/index";
import { Navigate, Outlet } from "react-router";

const PrivateUserRoutes = () => {
    const token = localStorage.getItem('access');
    // const role = localStorage.getItem('role');

    // return token && role === 'user' ? <Outlet /> : <Navigate to={routes.auth} />;
    return token ? <Outlet /> : <Navigate to={routes.auth} />;

};

export default PrivateUserRoutes;