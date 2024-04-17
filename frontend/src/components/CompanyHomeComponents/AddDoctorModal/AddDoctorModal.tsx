// DoctorFormModal.tsx
import React, { useState } from 'react';
import { useAuth } from '../../../context/Auth';

interface DoctorFormModalProps {
    onClose: () => void;
    onSubmit: (doctorData: any) => void;
    companyId: string | null | number;
}

const AddDoctorFormModal: React.FC<DoctorFormModalProps> = ({ onClose, onSubmit }) => {
    const { companyId } = useAuth()
    const [doctorData, setDoctorData] = useState({ firstName: '', lastName: '', position: '', email: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const company_id = companyId
        const doctorDataWithCompanyId = { ...doctorData, company_id };
        onSubmit(doctorDataWithCompanyId);
    };

    return (
        <div className="top-0 left-0 fixed flex justify-center items-center bg-black bg-opacity-50 w-full h-full">
            <div className="bg-white p-8 rounded-md">
                <h2 className="mb-4 text-xl">Add Doctor</h2>
                <input type="text" name="firstName" value={doctorData.firstName} onChange={handleChange} placeholder="Name" className="border-gray-300 mb-2 px-4 py-2 border rounded-md w-full" />
                <input type="text" name="lastName" value={doctorData.lastName} onChange={handleChange} placeholder="Name" className="border-gray-300 mb-2 px-4 py-2 border rounded-md w-full" />
                <input type="text" name="position" value={doctorData.position} onChange={handleChange} placeholder="Position" className="border-gray-300 mb-2 px-4 py-2 border rounded-md w-full" />
                <input type="email" name="email" value={doctorData.email} onChange={handleChange} placeholder="Email" className="border-gray-300 mb-2 px-4 py-2 border rounded-md w-full" />
                <div className="flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-bold text-white" onClick={handleSubmit}>Submit</button>
                    <button className="bg-gray-300 hover:bg-gray-400 ml-2 px-4 py-2 rounded font-bold text-gray-700" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddDoctorFormModal;
