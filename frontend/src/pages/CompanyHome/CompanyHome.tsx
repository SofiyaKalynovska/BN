// import React, { useEffect, useState } from "react";
// import { addDoctor, deleteDoctor, getDoctorsList } from "./api";
// import { AddDoctorFormModal, DoctorsList, FilterDoctorsList, Pagination } from "@components/index";
// import { useAuth } from "../../context/Auth";
// import AddIcon from '../../shared/ui/assets/figmaIcons/AddIcon.svg'
// import api from "../../services/apiService";
// import routes from "@router/index";
// import { useQuery } from "react-query";

// const CompanyHomePage: React.FC = () => {
//     const { companyId } = useAuth();
//     const [doctors, setDoctors] = useState<any[]>([]);
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [showModal, setShowModal] = useState(false);
//     const [totalPages, setTotalPages] = useState<number>(1);
//     const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
//     const [isTyping, setIsTyping] = useState<boolean>(false);


//     const getDoctorsListQuery = async () =>
//         api.get<any>(`${routes.doctorsList}/${companyId}?page=${currentPage}`).then((res) => res.data);

//     console.log(searchQuery, 'searchQuery');

//     useEffect(() => {

//     }, [companyId]);

//     const {
//         data: homeAddressInfo,
//         isFetching: getDoctorsListIsFetching,
//         isLoading: getDoctorsListIsLoading,
//         // refetch: homeAddressInfoRefetch,
//     } = useQuery<any>(
//         "getDoctorsListQuery",
//         getDoctorsListQuery
//     );

//     console.log(homeAddressInfo, 'homeAddressInfo');



//     const fetchDoctors = async (searchQuery?: string) => {
//         try {
//             const data = await getDoctorsList(companyId, currentPage, searchQuery);
//             setDoctors(data.doctors);
//             setTotalPages(data.amount_of_pages);
//         } catch (error) {
//             console.error("Error fetching doctors:", error);
//         }
//     };

//     useEffect(() => {
//         if (!isTyping) {
//             fetchDoctors(searchQuery);
//         }
//     }, [isTyping, searchQuery, currentPage, companyId]);

//     const handleSearch = (query: string) => {
//         setSearchQuery(query);
//         setCurrentPage(1);
//         if (typingTimeout) {
//             clearTimeout(typingTimeout);
//         }
//         setTypingTimeout(setTimeout(() => {
//             setIsTyping(false);
//         }, 1200));
//         setIsTyping(true);
//     };

//     const handleAddDoctor = async (doctorData: any) => {
//         try {
//             await addDoctor(doctorData);
//             fetchDoctors();
//             setShowModal(false);
//         } catch (error) {
//             console.error("Error adding doctor:", error);
//         }
//     };

//     const handleDeleteDoctor = async (doctorId: string) => {
//         try {
//             await deleteDoctor(doctorId);
//             fetchDoctors();
//         } catch (error) {
//             console.error("Error deleting doctor:", error);
//         }
//     };

//     const handlePageChange = (pageNumber: number) => {
//         setCurrentPage(pageNumber);
//     };

//     if (getDoctorsListIsLoading || getDoctorsListIsFetching) {
//         return <div>Loading...</div>
//     }

//     return (
//         <div className="mx-auto px-8 pt-9 pb-4 container size-full">
//             <div className="flex justify-between items-center gap-5 mb-8">
//                 <h2 className="font-semibold text-2xl">List of Doctors</h2>
//                 <div className="flex gap-5">
//                     <FilterDoctorsList onSearch={handleSearch} />
//                     <button
//                         className="flex justify-center items-center gap-1 bg-amber50 disabled:bg-gray-400 px-4 py-2 border rounded-2xl w-40 h-12 font-semibold text-sm text-white disabled:cursor-not-allowed"
//                         onClick={() => setShowModal(true)}
//                     >
//                         <img src={AddIcon} alt='add' />
//                         Doctor
//                     </button>
//                 </div>
//             </div>
//             <DoctorsList doctors={doctors} onDelete={handleDeleteDoctor} />
//             <Pagination
//                 totalPages={totalPages}
//                 currentPage={currentPage}
//                 onPageChange={handlePageChange}
//             />
//             {showModal && (
//                 <AddDoctorFormModal onClose={() => setShowModal(false)} onSubmit={handleAddDoctor} companyId={companyId} />
//             )}
//         </div>
//     );
// };

// export default CompanyHomePage;

// import React, { useEffect, useState } from "react";
// import { AddDoctorFormModal, DoctorsList, FilterDoctorsList, Pagination } from "@components/index";
// import { useAuth } from "../../context/Auth";
// import AddIcon from '../../shared/ui/assets/figmaIcons/AddIcon.svg'
// import api from "../../services/apiService";
// import routes from "@router/index";
// import { useMutation, useQuery } from "react-query";
// import { API_BASE_URL } from "../../env";
// import { toast } from "react-toastify";


// interface DoctorList {
//     companyId: number | null | string;
//     page?: number;
//     searchQuery?: string;
// }
// interface AddDoctorData {
//     firstName: string,
//     lastName: string,
//     position: string,
//     email: string,
// }

// const CompanyHomePage: React.FC = () => {
//     const { companyId } = useAuth();
//     const [doctors, setDoctors] = useState<any[]>([]);
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [showModal, setShowModal] = useState(false);
//     const [totalPages, setTotalPages] = useState<number>(1);
//     const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
//     const [isTyping, setIsTyping] = useState<boolean>(false);

//     const getDoctorsListQuery = async () =>
//         api.get<DoctorList[]>(`${routes.doctorsList}/${companyId}?page=${currentPage}&searchQuery=${searchQuery}`).then((res) => res.data);

//     const addDoctorQuery = (doctorData: any) =>
//         api.post(`${API_BASE_URL}${routes.addDoctor}`,
//             doctorData).then((res) => res.data);

//     const { mutateAsync: createDoctorByClinic, isLoading } = useMutation(
//         "addDoctorQuery",
//         (values: AddDoctorData) => addDoctorQuery(values),
//         {
//             onSuccess: () => {
//                 getDoctorsListQuery();
//                 refetchDoctorsList();
//                 toast.success("Your user added successfully.");
//             },
//             onError: () => {
//                 toast.error("Opps somethings went wrong. Doctor was not added");
//             },
//         }
//     );
//     const {
//         data: doctorsListData,
//         isFetching: getDoctorsListIsFetching,
//         isLoading: getDoctorsListIsLoading,
//         refetch: refetchDoctorsList,
//     } = useQuery<any>(
//         ["getDoctorsListQuery", searchQuery],
//         getDoctorsListQuery
//     );


//     // useEffect(() => {
//     //     if (companyId) {
//     //         refetchDoctorsList();
//     //     }
//     // }, [companyId]);

//     const handleAddDoctor = async (doctorData: any) => {
//         try {
//             createDoctorByClinic(doctorData)
//             // refetchDoctorsList();
//             setShowModal(false);
//         } catch (error) {
//             console.error("Error adding doctor:", error);
//         }
//     };

//     // const fetchDoctors = async (searchQuery?: string) => {
//     //     try {
//     //         const data = await getDoctorsList(companyId, currentPage, searchQuery);
//     //         setDoctors(data.doctors);
//     //         setTotalPages(data.amount_of_pages);
//     //     } catch (error) {
//     //         console.error("Error fetching doctors:", error);
//     //     }
//     // };

//     // useEffect(() => {
//     //     if (!isTyping) {
//     //         fetchDoctors(searchQuery);
//     //     }
//     // }, [isTyping, searchQuery, currentPage, companyId]);

//     const handleSearch = (query: string) => {
//         setSearchQuery(query);
//         setCurrentPage(1);
//         if (typingTimeout) {
//             clearTimeout(typingTimeout);
//         }
//         setTypingTimeout(setTimeout(() => {
//             setIsTyping(false);
//         }, 1200));
//         setIsTyping(true);
//     };


//     const handleDeleteDoctor = async (doctorId: string) => {
//         try {
//             await deleteDoctor(doctorId);
//             refetchDoctorsList();
//         } catch (error) {
//             console.error("Error deleting doctor:", error);
//         }
//     };

//     const handlePageChange = (pageNumber: number) => {
//         setCurrentPage(pageNumber);
//     };

//     if (getDoctorsListIsLoading || getDoctorsListIsFetching || isLoading) {
//         return <div>Loading...</div>
//     }

//     return (
//         <div className="mx-auto px-8 pt-9 pb-4 container size-full">
//             <div className="flex justify-between items-center gap-5 mb-8">
//                 <h2 className="font-semibold text-2xl">List of Doctors</h2>
//                 <div className="flex gap-5">
//                     <FilterDoctorsList onSearch={handleSearch} />
//                     <button
//                         className="flex justify-center items-center gap-1 bg-amber50 disabled:bg-gray-400 px-4 py-2 border rounded-2xl w-40 h-12 font-semibold text-sm text-white disabled:cursor-not-allowed"
//                         onClick={() => setShowModal(true)}
//                     >
//                         <img src={AddIcon} alt='add' />
//                         Doctor
//                     </button>
//                 </div>
//             </div>
//             <DoctorsList doctors={doctorsListData.doctors} onDelete={handleDeleteDoctor} />
//             <Pagination
//                 totalPages={totalPages}
//                 currentPage={currentPage}
//                 onPageChange={handlePageChange}
//             />
//             {showModal && (
//                 <AddDoctorFormModal onClose={() => setShowModal(false)} onSubmit={handleAddDoctor} companyId={companyId} />
//             )}
//         </div>
//     );
// };

// export default CompanyHomePage;


import React, { useEffect, useState } from "react";
import { AddDoctorFormModal, DoctorsList, FilterDoctorsList, Pagination } from "@components/index";
import { useAuth } from "../../context/Auth";
import AddIcon from '../../shared/ui/assets/figmaIcons/AddIcon.svg'
import api from "../../services/apiService";
import routes from "@router/index";
import { useMutation, useQuery } from "react-query";
import { API_BASE_URL } from "../../env";
import { toast } from "react-toastify";

interface Doctor {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    email: string;
}

interface DoctorListResponse {
    doctors: Doctor[];
    amount_of_pages: number;
}

interface AddDoctorData {
    firstName: string;
    lastName: string;
    position: string;
    email: string;
}

const CompanyHomePage: React.FC = () => {
    const { companyId } = useAuth();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showModal, setShowModal] = useState(false);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const getDoctorsListQuery = async () => {
        const response = await api.get<DoctorListResponse>(`${routes.doctorsList}/${companyId}?page=${currentPage}&search_info=${searchQuery}`);
        return response.data;
    };

    const { data: doctorsListData, isFetching: getDoctorsListIsFetching, isLoading: getDoctorsListIsLoading, refetch: refetchDoctorsList } = useQuery<DoctorListResponse>(
        ["getDoctorsListQuery", companyId, currentPage],
        getDoctorsListQuery
    );

    const deleteDoctorMutation = useMutation(
        (doctorId: string) => api.delete(`${API_BASE_URL}${routes.deleteDoctor}/${doctorId}`),
        {
            onSuccess: () => {
                refetchDoctorsList();
                toast.success("Doctor was successfully deleted.");
            },
            onError: () => {
                toast.error("Oops, something went wrong. Doctor was not deleted.");
            },
        }
    );

    const addDoctorMutation = useMutation(
        (doctorData: AddDoctorData) => api.post(`${API_BASE_URL}${routes.addDoctor}`, doctorData),
        {
            onSuccess: () => {
                refetchDoctorsList();
                toast.success("Doctor was successfully added.");
                setShowModal(false);
            },
            onError: () => {
                toast.error("Oops, something went wrong. Doctor was not added.");
            },
        }
    );

    const handleDeleteDoctor = async (doctorId: string) => {
        try {
            await deleteDoctorMutation.mutateAsync(doctorId);
        } catch (error) {
            console.error("Error deleting doctor:", error);
        }
    };

    const handleAddDoctor = async (doctorData: AddDoctorData) => {
        try {
            await addDoctorMutation.mutateAsync(doctorData);
            setShowModal(false);
        } catch (error) {
            console.error("Error adding doctor:", error);
        }
    };

    useEffect(() => {
        if (doctorsListData) {
            setDoctors(doctorsListData.doctors);
            setTotalPages(doctorsListData.amount_of_pages);
        }
    }, [doctorsListData]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setTypingTimeout(setTimeout(() => {
            refetchDoctorsList();
            setIsTyping(false);
        }, 800));
        setIsTyping(true);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        // refetchDoctorsList();
    };

    if (getDoctorsListIsLoading || getDoctorsListIsFetching) {
        return <div>Loading...</div>
    }


    return (
        <div className="mx-auto px-8 pt-9 pb-4 container size-full">
            <div className="flex justify-between items-center gap-5 mb-8">
                <h2 className="font-semibold text-2xl">List of Doctors</h2>
                <div className="flex gap-5">
                    <FilterDoctorsList onSearch={handleSearch} value={searchQuery} />
                    <button
                        className="flex justify-center items-center gap-1 bg-amber50 disabled:bg-gray-400 px-4 py-2 border rounded-2xl w-40 h-12 font-semibold text-sm text-white disabled:cursor-not-allowed"
                        onClick={() => setShowModal(true)}
                    >
                        <img src={AddIcon} alt='add' />
                        Doctor
                    </button>
                </div>
            </div>
            <DoctorsList doctors={doctorsListData?.doctors as Doctor[]} onDelete={handleDeleteDoctor} />
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            {showModal && (
                <AddDoctorFormModal onClose={() => setShowModal(false)} onSubmit={handleAddDoctor} companyId={companyId} />
            )}
        </div>
    );
};

export default CompanyHomePage;
