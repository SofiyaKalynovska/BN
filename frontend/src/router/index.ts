import { API_BASE_URL } from '../env';

//fix rotes
const routes = {
  // API ROUTES
  baseURL: API_BASE_URL,

  companyRegistration: '/company/',
  doctorRegistration: '/doctor/',
  // refresh: '/refresh/',

  companyLogin: '/jwt/login/company/',
  doctorLogin: '/jwt/login/doctor',

  doctorsList: '/company/doctor',
  addDoctor: '/company/doctor/',
  deleteDoctor: '/company/doctor',

  // forgotPassword: '/forgotPassword/',
  // verify: '/verify/',

  // User Auth ROUTES
  // index: `/doctor/:company_id/:page`,
  doctors: '/doctors/',
  doctor: '/doctor/:id',

  options: '/options',
  generateNote: 'generate_note',

  auth: '/auth',
  refresh: '/refresh',

  // LANDING ROUTES
  // companyHome: '/company/home',
  doctorHome: '/doctor/home',
  landingPage: '/',
};

export default routes;
