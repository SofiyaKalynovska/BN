import React from 'react'

import CompanyRegistration from './Registration/CompanyRegistration/CompanyRegistrationForm'
import { Login } from './LogIn'
import { UserRegistration } from './Registration/UserRegistration'
import { DoctorHome } from '../../pages/DoctorHome'

const Auth: React.FC = () => {
    return (
        <div>
            <DoctorHome />
            <Login />
            <UserRegistration />
            <CompanyRegistration />
        </div>
    )
}

export default Auth;