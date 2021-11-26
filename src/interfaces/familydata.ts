import TableCommons from "./interfaceCommons";

export default interface familydataTable extends TableCommons {
  family_id: string;
  parent_firstname: string;
  parent_lastname: string;
  parent_phonenumber: string;
  emergency_firstname: string;
  emergency_lastname: string;
  emergency_phonenumber: string;
  parent_email: string;
  home_address: string;
  city: string;
  how_parent_heard_about_us: string;
}
