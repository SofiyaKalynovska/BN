export interface ILoginFormValues {
  loggedIn: string;
  email: string;
  password: string;
  amount_of_pages: number;
  tariff_plan_id: number;
  id: number | null | string;
}

export interface IRegistrationFormValues {
  name: string;
  email: string;
  password: string;
  active: boolean;
}

export interface IUserRegistrationFormValues {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  password: string;
  tariff_plan_id: number;
  active: boolean;
}

export interface IForgotFormValues {
  email: string;
}

export interface HttpErrorResponse {
  message: string;
}
