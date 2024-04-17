// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { toast } from 'react-toastify';

// import { useAuth } from '../../../context/Auth';
// import Button from '../../../shared/ui/Button/Button';
// import { loginSchema } from '../../../shared/utils/validationSchemas';
// import FormField from '../../../shared/ui/FormField/FormFiels';
// import routes from '@router/index';

// const Login: React.FC = () => {
//     const { login } = useAuth();
//     const { companyId } = useAuth()
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//     const [loginType, setLoginType] = useState<string>('company');
//     const { register, handleSubmit, formState: { errors }, reset } = useForm({
//         resolver: yupResolver(loginSchema),
//     });

//     const handleLoginClick = async (data: any) => {
//         try {
//             const response = await login(data, loginType as "company" | "user");
//             if (response.access_token) {
//                 setIsAuthenticated(true);
//                 reset();

//             }
//         } catch (error) {
//             console.error('Login failed:', error);
//             toast.error("Login failed, login and password didn't match");
//         }
//     };

//     const handleToggle = (type: string) => {
//         setLoginType(type);
//     };

//     const handleForgotPassword = () => {
//         console.log('Forgot password clicked');
//     };

//     return (
//         <div className="bg-blue-100 min-h-screen flex items-center justify-center">
//             <div className="login-form bg-white rounded-md p-8 shadow-md" style={{ width: '440px', minHeight: '500px', padding: '112px 40px 57px 40px', borderRadius: '24px' }}>
//                 <h2 className="text-2xl mb-8">Login</h2>
//                 <form onSubmit={handleSubmit(handleLoginClick)}>
//                     <div>
//                         <label>
//                             <input type="radio" name="loginType" value="company" checked={loginType === 'company'} onChange={() => handleToggle('company')} />
//                             Company
//                         </label>
//                         <label>
//                             <input type="radio" name="loginType" value="user" checked={loginType === 'user'} onChange={() => handleToggle('user')} />
//                             User
//                         </label>
//                     </div>
//                     <FormField
//                         label="Email"
//                         htmlFor="email"
//                         type="email"
//                         placeholder="Enter your Email"
//                         register={register}
//                         error={errors.email}
//                     />
//                     <FormField
//                         label="Password"
//                         htmlFor="password"
//                         type="password"
//                         placeholder="Enter your Password"
//                         register={register}
//                         error={errors.password}
//                     />
//                     <Button size='large'>Login</Button>
//                     <button className="text-gray-500 hover:underline" onClick={handleForgotPassword}>Forgot Password?</button>
//                 </form>
//             </div>
//             {isAuthenticated && <Navigate to={`${routes.doctors}${companyId}/`} />}
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { useAuth } from '../../../context/Auth';
import Button from '../../../shared/ui/Button/Button';
import { loginSchema } from '../../../shared/utils/validationSchemas';
import FormField from '../../../shared/ui/FormField/FormFiels';
import routes from '@router/index';

const Login: React.FC = () => {
    const { login } = useAuth();
    const { companyId } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loginType, setLoginType] = useState<string>('company');
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const handleLoginClick = async (data: any) => {
        try {
            const response = await login(data, loginType as "company" | "user");
            if (response.access_token) {
                setIsAuthenticated(true);
                reset();
                if (loginType === 'company') {
                    return <Navigate to={`${routes.doctors}${companyId}/`} />;
                } else {
                    return <Navigate to={routes.doctorHome} />;
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error("Login failed, login and password didn't match");
        }
    };

    const handleToggle = (type: string) => {
        setLoginType(type);
    };

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
    };

    return (
        <div className="bg-blue-100 min-h-screen flex items-center justify-center">
            <div className="login-form bg-white rounded-md p-8 shadow-md" style={{ width: '440px', minHeight: '500px', padding: '112px 40px 57px 40px', borderRadius: '24px' }}>
                <h2 className="text-2xl mb-8">Login</h2>
                <form onSubmit={handleSubmit(handleLoginClick)}>
                    <div>
                        <label>
                            <input type="radio" name="loginType" value="company" checked={loginType === 'company'} onChange={() => handleToggle('company')} />
                            Company
                        </label>
                        <label>
                            <input type="radio" name="loginType" value="user" checked={loginType === 'user'} onChange={() => handleToggle('user')} />
                            User
                        </label>
                    </div>
                    <FormField
                        label="Email"
                        htmlFor="email"
                        type="email"
                        placeholder="Enter your Email"
                        register={register}
                        error={errors.email}
                    />
                    <FormField
                        label="Password"
                        htmlFor="password"
                        type="password"
                        placeholder="Enter your Password"
                        register={register}
                        error={errors.password}
                    />
                    <Button size='large'>Login</Button>
                    <button className="text-gray-500 hover:underline" onClick={handleForgotPassword}>Forgot Password?</button>
                </form>
            </div>
            {isAuthenticated && <Navigate to={`${routes.doctors}${companyId}/`} />}
        </div>
    );
};

export default Login;

