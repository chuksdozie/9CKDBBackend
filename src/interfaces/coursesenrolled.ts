import TableCommons from "./interfaceCommons";

export default interface coursesEnrolledTable extends TableCommons {
  student_id: string;
  course_id: string;
  camp_id: string;
  mode: string;
  location_id: string;
}
