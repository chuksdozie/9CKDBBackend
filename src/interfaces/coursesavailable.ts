import TableCommons from './interfaceCommons';

export default interface coursesAvailableTable extends TableCommons {
  course_id: string;
  course_name: string;
  course_code: string;
}