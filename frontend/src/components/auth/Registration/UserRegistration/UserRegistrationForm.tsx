import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { userRegistrationSchema } from '../../../../shared/utils/validationSchemas';
import { useAuth } from '../../../../context/Auth';

import FormField from '../../../../shared/ui/FormField/FormFiels';
import Button from '../../../../shared/ui/Button/Button';



const UserRegistration: React.FC = () => {
    const { userSignUp } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userRegistrationSchema),
    });

    const handleRegisterClick = async (data: any) => {
        const { confirmPassword, ...newData } = data;

        const newDataWithActive = {
            ...newData,
            active: true,
        };

        try {
            const response = await userSignUp(newDataWithActive);

            console.log(response, 'response');

            if (response.active) {
                toast.success("User registered");
            } else {
                toast.error("Ooops, something went wrong");
            }
            console.log('User registration successful');
        } catch (error) {
            console.error('User registration failed:', error);
            toast.error("Ooops, something went wrong");
            setError('User registration failed. Please try again.');
        }
    };

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
    };

    return (
        <div className="bg-blue-100 min-h-screen flex items-center justify-center">
            <div className="registration-form bg-white rounded-md p-8 shadow-md" style={{ width: '440px', minHeight: '791px', padding: '112px 40px 57px 40px', borderRadius: '24px' }}>
                <h2 className="text-2xl mb-8">User Registration</h2>
                <form onSubmit={handleSubmit(handleRegisterClick)}>
                    <FormField
                        label="First Name"
                        htmlFor="firstName"
                        type="text"
                        placeholder="Enter your First Name"
                        register={register}
                        error={errors.firstName}
                    />

                    <FormField
                        label="Last Name"
                        htmlFor="lastName"
                        type="text"
                        placeholder="Enter your Last Name"
                        register={register}
                        error={errors.lastName}
                    />

                    <FormField
                        label="Position"
                        htmlFor="position"
                        type="text"
                        placeholder="Enter your Position"
                        register={register}
                        error={errors.position}
                    />

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

                    <FormField
                        label="Confirm Password"
                        htmlFor="confirmPassword"
                        type="password"
                        placeholder="Confirm your Password"
                        register={register}
                        error={errors.confirmPassword}
                    />

                    <Button size='large'>Register now</Button>
                    {error && <span className="text-red-600 mt-2">{error}</span>}
                    <button className="text-gray-500 hover:underline" onClick={handleForgotPassword}>Forgot Password?</button>
                </form>
            </div>
        </div>
    );
};

export default UserRegistration;
