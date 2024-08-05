export type Employee = {
  id: string;
  employee_name: string;
  department_id: string;
  salary: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  email: string;
  start_date: Date;
  end_date: Date;
};
[];

export enum Deparment {
  Account = "account",
  Admin = "admin",
  HR = "hr",
  IT = "it",
}
