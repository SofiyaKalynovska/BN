import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { useMutation } from "react-query";
import axios from "axios";

import {
    HttpErrorResponse,
    IForgotFormValues,
    ILoginFormValues,
    IRegistrationFormValues,
    IUserRegistrationFormValues,
} from '../interfaces/auth.interfaces';
import routes from "@router/index";
import { COMPANY_ID, REFRESH_TOKEN, ROLE, TOKEN } from "../constants/auth";
import { localStorageManager } from "../services";

type ClinicRegistrationType = {
    active: boolean;
    created_at: string;
    email: string;
    name: string;
    password: string;
    tariff_plan_id: number;
    amount_of_pages: number;
    updated_at: string;
};
//myTry
type UserRegistrationType = {
    active: boolean;
    created_at: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    updated_at: string;
};
type ForgotPasswordType = {
    detail: string;
};

type LoginType<T extends 'company' | 'user'> = {
    loggedIn: boolean;
    access_token: string;
    refresh_token: string;
} & (T extends 'company' ? { company_id: number | null | string } : { doctor_id: number | null | string });

interface UserDataInterface {
    createdAt: string;
    email: string;
    id: string;
    password: string;
    role: string;
    updatedAt: string;
    _id: string;
    name: string;
    avatar?: string;
    oldAvatar?: string;
    avatarPublicId?: string;
}

interface AuthContextInterface {
    isInitializing: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
    userData: UserDataInterface | null;
    clinicSignUp: (userData: IRegistrationFormValues) => Promise<ClinicRegistrationType>;
    userSignUp: (userData: IUserRegistrationFormValues) => Promise<UserRegistrationType>;
    login: (userData: ILoginFormValues, loginType: "company" | "user") => Promise<LoginType<"company" | "user">>;
    forgotPassword: (userData: IForgotFormValues) => Promise<ForgotPasswordType>;
    logout: () => void;
    role: string;
    handleAuth: (
        access_token: string,
        refresh_token: string,
        companyId: number | null | string,
        userId: number | null | string,
    ) => void;
    companyId: number | null | string;
    userId: number | null | string;
}

const authAPI = axios.create({
    baseURL: routes.baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

const clinicSignUpMutation = (userData: IRegistrationFormValues) =>
    authAPI.post(routes.companyRegistration, userData).then((res) => res.data);
const userSignUpMutation = (userData: IUserRegistrationFormValues) =>
    authAPI.post(routes.doctorRegistration, userData).then((res) => res.data);
const companyLoginMutation = (userData: ILoginFormValues) =>
    authAPI.post(routes.companyLogin, userData).then((res) => ({
        loggedIn: true,
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        tariff_plan_id: res.data.tariff_plan_id,
        amount_of_pages: res.data.amount_of_pages,
        company_id: res.data.company_id,
        doctor_id: null,
    }));
const userLoginMutation = (userData: ILoginFormValues) =>
    authAPI.post(routes.doctorLogin, userData).then((res) => ({
        loggedIn: true,
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        company_id: null,
        doctor_id: res.data.doctor_id,

    }));
const forgotPasswordMutation = (userData: IForgotFormValues) =>
    authAPI.post(routes.forgotPassword, userData).then((res) => res.data);
const deleteDoctorMutation = (doctorId: string) =>
    authAPI.delete(routes.deleteDoctor + `/${doctorId}`).then((res) => res.data);


export const AuthContext = createContext<AuthContextInterface | null>(null);
export const useAuth = () => useContext(AuthContext) as AuthContextInterface;

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
    const [userData, setUserData] = useState<UserDataInterface | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState("");
    const [token, setAuthToken] = useState<string | null>(localStorageManager.getItem(TOKEN));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
    const [refreshToken, setAuthRefreshToken] = useState<string | null>(localStorageManager.getItem(REFRESH_TOKEN));
    const [companyId, setCompanyId] = useState<number | null | string>(localStorageManager.getItem(COMPANY_ID));

    useEffect(() => {
        const storedCompanyId = localStorageManager.getItem("companyId");
        if (storedCompanyId) {
            setCompanyId(parseInt(storedCompanyId, 10));
        }
    }, []);

    const { mutateAsync: loginRequestMutationCompany } = useMutation(
        "loginMutationCompany",
        (values: ILoginFormValues) => companyLoginMutation(values)
    );
    const { mutateAsync: loginRequestMutationUser } = useMutation(
        "loginMutationUser",
        (values: ILoginFormValues) => userLoginMutation(values)
    );
    const { mutateAsync: clinicSignUpRequestMutation } = useMutation(
        "clinicSignUpMutation",
        (values: IRegistrationFormValues) => clinicSignUpMutation(values)
    );
    const { mutateAsync: userSignUpRequestMutation } = useMutation(
        "userSignUpMutation",
        (values: IUserRegistrationFormValues) => userSignUpMutation(values)
    );
    const { mutateAsync: forgotRequestMutation } = useMutation(
        "forgotPasswordMutation",
        (values: IForgotFormValues) => forgotPasswordMutation(values)
    );
    const useDeleteDoctorMutation = () => {
        return useMutation('deleteDoctor', deleteDoctorMutation);
    };

    const clinicSignUp = async (userData: IRegistrationFormValues) => {
        try {
            const data = await clinicSignUpRequestMutation(userData);
            return data;
        } catch (e) {
            throw new Error((e as HttpErrorResponse).message);
        }
    };

    const userSignUp = async (userData: IUserRegistrationFormValues) => {
        try {
            const data = await userSignUpRequestMutation(userData);
            return data;
        } catch (e) {
            throw new Error((e as HttpErrorResponse).message);
        }
    };
    const login = async (userData: ILoginFormValues, loginType: "company" | "user"): Promise<LoginType<"company" | "user">> => {
        try {
            const loginMutation = loginType === 'company' ? loginRequestMutationCompany : loginRequestMutationUser;

            // Get tokens from local storage
            const token = localStorageManager.getItem(TOKEN);
            const refreshToken = localStorageManager.getItem(REFRESH_TOKEN);

            // Set tokens in the request headers
            if (token) authAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            if (refreshToken) authAPI.defaults.headers.common['Refresh-Token'] = refreshToken;

            // Make the login API call
            const { access_token, refresh_token, company_id, doctor_id } = await loginMutation(userData);

            // Clear the tokens from request headers
            delete authAPI.defaults.headers.common['Authorization'];
            delete authAPI.defaults.headers.common['Refresh-Token'];

            // Update local storage and state with the new tokens
            handleAuth(access_token, refresh_token, loginType === 'company' ? company_id : doctor_id);
            setAuthToken(access_token);
            setAuthRefreshToken(refresh_token);
            setIsAuthenticated(true);

            const loggedInData: LoginType<"company" | "user"> = {
                loggedIn: true,
                access_token,
                refresh_token,
                company_id,
                doctor_id,
            };

            return loggedInData;
        } catch (error) {
            setIsAuthenticated(false);
            throw new Error((error as HttpErrorResponse).message);
        }
    };

    // const login = async (userData: ILoginFormValues, loginType: "company" | "user"): Promise<LoginType<"company" | "user">> => {
    //     try {
    //         const loginMutation = loginType === 'company' ? loginRequestMutationCompany : loginRequestMutationUser;
    //         const { access_token, refresh_token, company_id, doctor_id } = await loginMutation(userData);

    //         const loggedInData: LoginType<"company" | "user"> = {
    //             loggedIn: true,
    //             access_token,
    //             refresh_token,
    //             company_id,
    //             doctor_id,
    //         };

    //         handleAuth(access_token, refresh_token, loginType === 'company' ? company_id : doctor_id);

    //         setAuthToken(access_token);
    //         setAuthRefreshToken(refresh_token);
    //         setIsAuthenticated(true);

    //         return loggedInData;
    //     } catch (error) {
    //         setIsAuthenticated(false);
    //         throw new Error((error as HttpErrorResponse).message);
    //     }
    // };

    const forgotPassword = async (userData: IForgotFormValues) => {
        try {
            const data = await forgotRequestMutation(userData);
            return data;
        } catch (e) {
            throw new Error((e as HttpErrorResponse).message);
        }
    };

    const resetToken = () => {
        localStorageManager.removeItem(TOKEN);
        localStorageManager.removeItem(REFRESH_TOKEN);
    };

    const setToken = (access_token: string, refresh_token: string) => {
        localStorageManager.setItem<typeof access_token>(TOKEN, access_token);
        localStorageManager.setItem<typeof refresh_token>(REFRESH_TOKEN, refresh_token);
        setAuthToken(access_token);
        setAuthRefreshToken(refresh_token);
    };

    const setCompanyIdData = (id: string | undefined) => {
        if (id) {
            localStorageManager.setItem(COMPANY_ID, id);
            setCompanyId(id);
        }
    }

    const handleAuth = (access_token: string, refresh_token: string, id: number | null | string) => {
        setToken(access_token, refresh_token);
        setCompanyIdData(id?.toString());
    };

    const logout = () => {
        resetToken();
        localStorageManager.removeUser();
        setAuthToken(null);
        setAuthRefreshToken(null);
    };

    useEffect(() => {
        if (token && refreshToken) {
            handleAuth(token, refreshToken, companyId);
        } else {
            logout();
        }
    }, [token, refreshToken]);

    useEffect(() => {
        const localRole = localStorageManager.getItem(ROLE);
        if (localRole) {
            setRole(localRole);
        }
    }, []);

    const isInitializing = !!token;

    return (
        <AuthContext.Provider
            value={{
                isInitializing,
                isAuthenticated,
                userData,
                role,
                isLoading,
                clinicSignUp,
                userSignUp,
                login,
                handleAuth,
                forgotPassword,
                logout,
                companyId,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// import React, {
//     createContext,
//     PropsWithChildren,
//     useContext,
//     useEffect,
//     useState,
// } from "react";
// import { useMutation } from "react-query";
// import axios from "axios";

// import {
//     HttpErrorResponse,
//     IForgotFormValues,
//     ILoginFormValues,
//     IRegistrationFormValues,
//     IUserRegistrationFormValues,
// } from '../interfaces/auth.interfaces';
// import routes from "@router/index";
// import { COMPANY_ID, REFRESH_TOKEN, ROLE, TOKEN } from "../constants/auth";
// import { localStorageManager } from "../services";

// type ClinicRegistrationType = {
//     active: boolean;
//     created_at: string;
//     email: string;
//     name: string;
//     password: string;
//     tariff_plan_id: number;
//     amount_of_pages: number;
//     updated_at: string;
// };

// type UserRegistrationType = {
//     active: boolean;
//     created_at: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     updated_at: string;
// };

// type ForgotPasswordType = {
//     detail: string;
// };

// type LoginType<T extends 'company' | 'user'> = {
//     loggedIn: boolean;
//     access_token: string;
//     refresh_token: string;
// } & (T extends 'company' ? { company_id: number | null | string } : { doctor_id: number | null | string });

// interface UserDataInterface {
//     createdAt: string;
//     email: string;
//     id: string;
//     password: string;
//     role: string;
//     updatedAt: string;
//     _id: string;
//     name: string;
//     avatar?: string;
//     oldAvatar?: string;
//     avatarPublicId?: string;
// }

// interface AuthContextInterface {
//     isInitializing: boolean;
//     isAuthenticated: boolean;
//     isLoading: boolean;
//     userData: UserDataInterface | null;
//     clinicSignUp: (userData: IRegistrationFormValues) => Promise<ClinicRegistrationType>;
//     userSignUp: (userData: IUserRegistrationFormValues) => Promise<UserRegistrationType>;
//     login: (userData: ILoginFormValues, loginType: "company" | "user") => Promise<LoginType<"company" | "user">>;
//     forgotPassword: (userData: IForgotFormValues) => Promise<ForgotPasswordType>;
//     logout: () => void;
//     role: string;
//     handleAuth: (
//         access_token: string,
//         refresh_token: string,
//         companyId: number | null | string,
//         // userId: number | null | string,
//     ) => void;
//     companyId: number | null | string;
//     // userId: number | null | string;
// }

// const authAPI = axios.create({
//     baseURL: routes.baseURL,
//     headers: {
//         "Content-Type": "application/json",
//     },
//     withCredentials: true
// });

// const clinicSignUpMutation = (userData: IRegistrationFormValues) =>
//     authAPI.post(routes.companyRegistration, userData).then((res) => res.data);
// const userSignUpMutation = (userData: IUserRegistrationFormValues) =>
//     authAPI.post(routes.doctorRegistration, userData).then((res) => res.data);
// const companyLoginMutation = (userData: ILoginFormValues) =>
//     authAPI.post(routes.companyLogin, userData).then((res) => ({
//         loggedIn: true,
//         access_token: res.data.access_token,
//         refresh_token: res.data.refresh_token,
//         tariff_plan_id: res.data.tariff_plan_id,
//         amount_of_pages: res.data.amount_of_pages,
//         company_id: res.data.company_id,
//         doctor_id: null,
//     }));
// const userLoginMutation = (userData: ILoginFormValues) =>
//     authAPI.post(routes.doctorLogin, userData).then((res) => ({
//         loggedIn: true,
//         access_token: res.data.access_token,
//         refresh_token: res.data.refresh_token,
//         company_id: null,
//         doctor_id: res.data.doctor_id,

//     }));
// const forgotPasswordMutation = (userData: IForgotFormValues) =>
//     authAPI.post(routes.forgotPassword, userData).then((res) => res.data);
// const deleteDoctorMutation = (doctorId: string) =>
//     authAPI.delete(routes.deleteDoctor + `/${doctorId}`).then((res) => res.data);

// export const AuthContext = createContext<AuthContextInterface | null>(null);
// export const useAuth = () => useContext(AuthContext) as AuthContextInterface;

// export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
//     const [userData, setUserData] = useState<UserDataInterface | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [role, setRole] = useState("");
//     const [token, setAuthToken] = useState<string | null>(localStorageManager.getItem(TOKEN));
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
//     const [refreshToken, setAuthRefreshToken] = useState<string | null>(localStorageManager.getItem(REFRESH_TOKEN));
//     const [companyId, setCompanyId] = useState<number | null | string>(localStorageManager.getItem(COMPANY_ID));

//     useEffect(() => {
//         const storedCompanyId = localStorageManager.getItem("companyId");
//         if (storedCompanyId) {
//             setCompanyId(parseInt(storedCompanyId, 10));
//         }
//     }, []);

//     const setAuthHeaders = () => {
//         const access_token = cookieManager.getCookie(TOKEN);
//         if (access_token) {
//             authAPI.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
//         }
//     };

//     const { mutateAsync: loginRequestMutationCompany } = useMutation(
//         "loginMutationCompany",
//         (values: ILoginFormValues) => companyLoginMutation(values)
//     );
//     const { mutateAsync: loginRequestMutationUser } = useMutation(
//         "loginMutationUser",
//         (values: ILoginFormValues) => userLoginMutation(values)
//     );
//     const { mutateAsync: clinicSignUpRequestMutation } = useMutation(
//         "clinicSignUpMutation",
//         (values: IRegistrationFormValues) => clinicSignUpMutation(values)
//     );
//     const { mutateAsync: userSignUpRequestMutation } = useMutation(
//         "userSignUpMutation",
//         (values: IUserRegistrationFormValues) => userSignUpMutation(values)
//     );
//     const { mutateAsync: forgotRequestMutation } = useMutation(
//         "forgotPasswordMutation",
//         (values: IForgotFormValues) => forgotPasswordMutation(values)
//     );
//     const useDeleteDoctorMutation = () => {
//         return useMutation('deleteDoctor', deleteDoctorMutation);
//     };

//     const clinicSignUp = async (userData: IRegistrationFormValues) => {
//         try {
//             const data = await clinicSignUpRequestMutation(userData);
//             return data;
//         } catch (e) {
//             throw new Error((e as HttpErrorResponse).message);
//         }
//     };

//     const userSignUp = async (userData: IUserRegistrationFormValues) => {
//         try {
//             const data = await userSignUpRequestMutation(userData);
//             return data;
//         } catch (e) {
//             throw new Error((e as HttpErrorResponse).message);
//         }
//     };
//     const login = async (userData: ILoginFormValues, loginType: "company" | "user"): Promise<LoginType<"company" | "user">> => {
//         try {
//             const loginMutation = loginType === 'company' ? loginRequestMutationCompany : loginRequestMutationUser;
//             const { access_token, refresh_token, company_id, doctor_id } = await loginMutation(userData);

//             const loggedInData: LoginType<"company" | "user"> = {
//                 loggedIn: true,
//                 access_token,
//                 refresh_token,
//                 company_id,
//                 doctor_id,
//             };

//             handleAuth(access_token, refresh_token, loginType === 'company' ? company_id : doctor_id);

//             setAuthToken(access_token);
//             setAuthRefreshToken(refresh_token);
//             setIsAuthenticated(true);

//             setAuthHeaders(access_token);

//             return loggedInData;
//         } catch (error) {
//             setIsAuthenticated(false);
//             throw new Error((error as HttpErrorResponse).message);
//         }
//     };
//     const handleAuth = () => {
//         const access_token = cookieManager.getCookie(TOKEN);
//         const refresh_token = cookieManager.getCookie(REFRESH_TOKEN);
//         const companyId = cookieManager.getCookie(COMPANY_ID);

//         if (access_token && refresh_token) {
//             setAuthToken(access_token);
//             setAuthRefreshToken(refresh_token);
//             setCompanyId(companyId);
//             setAuthHeaders();
//         } else {
//             logout();
//         }
//     };

//     const forgotPassword = async (userData: IForgotFormValues) => {
//         try {
//             const data = await forgotRequestMutation(userData);
//             return data;
//         } catch (e) {
//             throw new Error((e as HttpErrorResponse).message);
//         }
//     };

//     const resetToken = () => {
//         localStorageManager.removeItem(TOKEN);
//         localStorageManager.removeItem(REFRESH_TOKEN);
//     };

//     const setToken = (access_token: string, refresh_token: string) => {
//         localStorageManager.setItem<typeof access_token>(TOKEN, access_token);
//         localStorageManager.setItem<typeof refresh_token>(REFRESH_TOKEN, refresh_token);
//         setAuthToken(access_token);
//         setAuthRefreshToken(refresh_token);
//     };

//     const logout = () => {
//         resetToken();
//         localStorageManager.removeUser();
//         setAuthToken(null);
//         setAuthRefreshToken(null);
//         delete authAPI.defaults.headers.common['Authorization'];
//     };

//     useEffect(() => {
//         if (token && refreshToken) {
//             handleAuth(token, refreshToken, companyId);
//         } else {
//             logout();
//         }
//     }, [token, refreshToken]);

//     useEffect(() => {
//         const localRole = localStorageManager.getItem(ROLE);
//         if (localRole) {
//             setRole(localRole);
//         }
//     }, []);
//     useEffect(() => {
//         handleAuth();
//     }, []);

//     const isInitializing = !!token;

//     return (
//         <AuthContext.Provider
//             value={{
//                 isInitializing,
//                 isAuthenticated,
//                 userData,
//                 role,
//                 isLoading,
//                 clinicSignUp,
//                 userSignUp,
//                 login,
//                 handleAuth,
//                 forgotPassword,
//                 logout,
//                 companyId,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

