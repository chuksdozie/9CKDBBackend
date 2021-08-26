import TableCommons from "./interfaceCommons";

export default interface adminTable extends TableCommons {
  id: string;
  admin_firstname: string;
  admin_lastname: string;
  admin_phonenumber: string;
  official_email: string;
  password: string;
  role: string;
  verified: boolean;
  owner: boolean;
  logged_at: string;
}
