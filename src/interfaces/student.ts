import TableCommons from './interfaceCommons';

export default interface studentTable extends TableCommons {
  student_id: string;
  first_name: string;
  last_name: string;
  family_id: string;
  date_of_birth: string;
  sex: string;
}