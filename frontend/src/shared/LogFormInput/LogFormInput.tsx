import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { companyRegistrationSchema } from '../utils/validationSchemas';


const CompanyRegistration: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(companyRegistrationSchema),
    });

    const handleRegisterClick = async (data: any) => {
        console.log(data, 'data');
        // Your registration logic here
    };

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
    };

    return (
        <div className="bg-blue-100 min-h-screen flex items-center justify-center">
            <div className="registration-form bg-white rounded-md p-8 shadow-md" style={{ width: '440px', minHeight: '791px', padding: '112px 40px 57px 40px', borderRadius: '24px' }}>
                <h2 className="text-2xl mb-8">Register your Company Account</h2>
                <form onSubmit={handleSubmit(handleRegisterClick)}>
                    <FormField
                        label="Company Name"
                        htmlFor="companyName"
                        type="text"
                        placeholder="Enter your Company Name"
                        register={register}
                        error={errors.companyName}
                    />

                    <FormField
                        label="Company Email"
                        htmlFor="companyEmail"
                        type="email"
                        placeholder="Enter your Company Email"
                        register={register}
                        error={errors.companyEmail}
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

                    <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Register now</button>

                    {error && <span className="text-red-600 mt-2">{error}</span>}

                    <button className="text-gray-500 hover:underline mt-2" onClick={handleForgotPassword}>Forgot Password?</button>
                </form>
            </div>
        </div>
    );
};

interface FormFieldProps {
    label: string;
    htmlFor: string;
    type: string;
    placeholder: string;
    register: any;
    error: any;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    htmlFor,
    type,
    placeholder,
    register,
    error,
}) => (
    <div className="mb-6">
        <label htmlFor={htmlFor} className="flex mb-2">
            {label}
            <span className="text-red-500">*</span>
        </label>
        <input
            type={type}
            id={htmlFor}
            placeholder={placeholder}
            className="w-full px-4 py-2 border rounded-2xl border-slate500 focus:outline-none focus:border-blue500"
            {...register(htmlFor)}
        />
        {error && <p className="text-red-600 mt-1 text-sm text-left">{error.message}</p>}
    </div>
);

export default CompanyRegistration;
