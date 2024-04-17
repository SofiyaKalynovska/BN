import routes from "@router/index";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const token = localStorage.getItem("access");
    // const role = localStorage.getItem('role');

    return token ? <Outlet /> : <Navigate to={routes.auth} />;
    // return token && role === 'clinic' ? <Outlet /> : <Navigate to={routes.auth} />;

};

export default PrivateRoutes;

