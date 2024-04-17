import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import {
    CompanyHomePage,
} from "./pages";

import { PrivateRoutes } from "./guard/PrivateRoutes";
import routes from "./router";
import { Auth } from "./components";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* <Route element={<LandingPage />} path={routes.landingPage} /> */}
            <Route element={<PrivateRoutes />}>
                <Route element={<CompanyHomePage />} path={`${routes.doctors}:id`} />
            </Route>
            <Route element={<Auth />} path={routes.auth} />
        </>
    )
);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;

// import {
//     BrowserRouter as Router,
//     Route,
//     Routes,
// } from 'react-router-dom';
// import { useAuth } from './context/Auth';
// import { PrivateRoutes } from './guard/PrivateRoutes';
// import PrivateUserRoutes from './guard/PrivateRoutes/PrivateUserRoutes';
// import { Auth } from './components';

// const App: React.FC = () => {
//     const { isAuthenticated, role } = useAuth();

//     return (
//         <Router>
//             <Routes>
//                 {isAuthenticated && role === 'clinic' && (
//                     <Route path="/doctors:id" element={<PrivateRoutes />} />
//                 )}
//                 {isAuthenticated && role === 'user' && (
//                     <Route path="/doctor:id" element={<PrivateUserRoutes />} />
//                 )}
//                 {!isAuthenticated && (
//                     <Route path="/auth" element={<Auth />} />
//                 )}
//             </Routes>
//         </Router>
//     );
// };

// export default App;

