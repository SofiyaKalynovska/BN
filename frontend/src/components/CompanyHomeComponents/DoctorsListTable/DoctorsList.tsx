
import React from 'react';
import Button from '../../../shared/ui/Button/Button';

interface Doctor {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    email: string;
}

interface DoctorTableProps {
    doctors: Doctor[];
    onDelete: (doctorId: string) => void;
}

const DoctorsList: React.FC<DoctorTableProps> = ({ doctors, onDelete }) => {
    return (
        <table className="w-full">
            <thead>
                <tr className="bg-blue100 text-gray500 text-sm text-left h-14">
                    <th className=" px-4 py-2 font-medium">First name</th>
                    <th className=" px-4 py-2 font-medium">Last name</th>
                    <th className=" px-4 py-2 font-medium">Position</th>
                    <th className=" px-4 py-2 font-medium">Email</th>
                    <th className=" px-4 py-2 font-medium text-right pr-24">Actions</th>
                </tr>
            </thead>
            <tbody>
                {doctors.map((doctor, index) => (
                    <tr className='bg-white h-16' key={index}>
                        <td className="border-t border-b border-stone200 px-4 py-2 text-lg	font-semibold">{doctor.firstName}</td>
                        <td className="border-t border-b border-stone200 px-4 py-2 text-lg	font-semibold">{doctor.lastName}</td>
                        <td className="border-t border-b border-stone200 px-4 py-2">{doctor.position}</td>
                        <td className="border-t border-b border-stone200 px-4 py-2">{doctor.email}</td>
                        <td className="border-t border-b border-stone200 px-4 py-2 text-right pr-8">
                            <Button size='small' onClick={() => onDelete(doctor.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    );
};

export default DoctorsList;
