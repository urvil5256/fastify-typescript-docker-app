export type Users = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  prefix: string;
  role_id: string;
  created_at: Date;
  updated_at: Date;
};
[];

export enum Roles {
  Admin = "admin",
  Empoyee = "employee",
}
