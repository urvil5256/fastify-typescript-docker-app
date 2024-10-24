export interface Users {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
  prefix: string;
  role_id?: string;
  created_at?: Date;
  updated_at?: Date;
}
