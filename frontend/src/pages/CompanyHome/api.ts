// import axios from 'axios';

// import { API_BASE_URL } from '../../env';
// import routes from '@router/index';

// export const getDoctorsList = async (
//   companyId: number | null | string,
//   page?: number,
//   searchQuery?: string
// ) => {
//   const queryParams = new URLSearchParams();
//   if (page) queryParams.append('page', page.toString());
//   if (searchQuery) queryParams.append('search_info', searchQuery);
//   const url = `${API_BASE_URL}${
//     routes.doctorsList
//   }/${companyId}?${queryParams.toString()}`;

//   const response = await axios.get(url);

//   return response.data;
// };

// export const addDoctor = async (doctorData: any) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}${routes.addDoctor}`,
//       doctorData
//     );
//     return response.data;
//   } catch (error: any) {
//     if (error.response && error.response.data && error.response.data.message) {
//       throw new Error(error.response.data.message);
//     } else {
//       throw new Error('An unknown error occurred.');
//     }
//   }
// };

// export const deleteDoctor = async (doctorId: string) => {
//   try {
//     const response = await axios.delete(
//       `${API_BASE_URL}${routes.deleteDoctor}/${doctorId}`
//     );
//     return response.data;
//   } catch (error: any) {
//     if (error.response && error.response.data && error.response.data.message) {
//       throw new Error(error.response.data.message);
//     } else {
//       throw new Error('An unknown error occurred.');
//     }
//   }
// };
