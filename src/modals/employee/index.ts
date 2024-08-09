export interface Employee {
  id: string;
  employee_name: string;
  department_id?: string;
  salary: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: number;
  phone: number;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}
