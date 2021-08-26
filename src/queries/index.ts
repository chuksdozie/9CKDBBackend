import { sql } from "../stores/database";
import adminTable from "../interfaces/admin";
import familydataTable from "../interfaces/familydata";
import studentTable from "../interfaces/student";
import locationsTable from "../interfaces/locations";
import coursesAvailableTable from "../interfaces/coursesavailable";
import coursesEnrolledTable from "../interfaces/coursesenrolled";
import campsTable from "../interfaces/camps";

/*
query for user to signup
 - get user details
 - send it to the database
*/

// signing up an admin
export async function signUpAdminQuery(payload: adminPayload) {
  return sql<adminTable>`INSERT INTO admins ${sql(
    payload,
    "admin_firstname",
    "admin_lastname",
    "admin_phonenumber",
    "official_email",
    "password"
  )} RETURNING *`;
}

// verifying the email of the owner
export async function verifyOwnerAdminQuery(email: string) {
  return sql<adminTable>`UPDATE admins SET 
  verified = ${true}, owner = ${true}
  WHERE official_email = ${email} 
  AND 
  deleted_at IS NULL 
  RETURNING *`;
}

// verifying the email of the owner
export async function verifyAdminQuery(email: string) {
  return sql<adminTable>`UPDATE admins SET 
  verified = ${true}
  WHERE official_email = ${email} 
  AND 
  deleted_at IS NULL 
  RETURNING *`;
}

// logging in an admin
export async function loginAdminQuery(email: string) {
  return sql<adminTable>`SELECT * FROM admins
  WHERE official_email = ${email}
  AND 
  deleted_at IS NULL`;
}

// a list of recent admin logins
export async function recentAdminLoginQuery() {
  return sql<adminTable>`SELECT 
  admin_firstname,
  admin_lastname,
  role,
  logged_at
  FROM admins
  WHERE logged_at IS NOT NULL
  AND
  deleted_at IS NULL
  ORDER BY logged_at DESC`;
}

// a list of recent admin logins
export async function getAllAdminsQuery() {
  return sql<adminTable>`SELECT *
  FROM admins
  WHERE 
  deleted_at IS NULL
  ORDER BY created_at DESC`;
}
// owner IS NOT true
// AND
// adding a new admin to db
export async function addNewAdminQuery(payload: newAdminPayload) {
  return sql<adminTable>`INSERT INTO admins ${sql(
    payload,
    "admin_firstname",
    "admin_lastname",
    "admin_phonenumber",
    "official_email",
    "password",
    "role"
  )} RETURNING *`;
}

// get admin  details by id
export async function getAdminByIdQuery(admin_id: string) {
  return sql<adminTable>`
  SELECT 
  admin_firstname, admin_lastname, admin_phonenumber, official_email, role ,password
  FROM
  admins 
  WHERE id = ${admin_id}
  AND 
  deleted_at IS NULL`;
}

// get admin  details by id
export async function getAdminByEmailQuery(email: string) {
  return sql<adminTable>`
  SELECT * FROM
  admins 
  WHERE official_email = ${email}
  AND 
  deleted_at IS NULL`;
}

// get admin  password by id
export async function getAdminPasswordByIdQuery(admin_id: string) {
  return sql<adminTable>`
  SELECT 
  password
  FROM
  admins 
  WHERE id = ${admin_id}
  AND 
  deleted_at IS NULL`;
}

// get all regular admin  details
export async function getRegularAdminsQuery() {
  return sql<adminTable>`
  SELECT 
  admin_firstname, admin_lastname, admin_phonenumber, official_email
  FROM
  admins 
  WHERE role = 'admin'
  AND 
  deleted_at IS NULL`;
}

// updating the admin information in dashboard
export async function editAdminQuery(id: string, payload: editAdminPayload) {
  return sql<adminTable>`UPDATE admins SET ${sql(
    payload,
    "admin_firstname",
    "admin_lastname",
    "admin_phonenumber",
    "official_email",
    "password",
    "updated_at"
  )} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

// updating the admin information in dashboard
export async function editAdminRoleQuery(
  id: string,
  payload: editAdminRolePayload
) {
  return sql<adminTable>`UPDATE admins SET ${sql(
    payload,
    "admin_firstname",
    "admin_lastname",
    "admin_phonenumber",
    "official_email",
    "role",
    "updated_at"
  )} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

// updating the admin information in dashboard
export async function editAdminPasswordQuery(
  id: string,
  payload: editAdminPayload
) {
  return sql<adminTable>`UPDATE admins SET ${sql(
    payload,
    "password",
    "updated_at"
  )} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

// delete an admin by id
export async function deleteAdminByIdQuery(
  id: string,
  payload: deleteAdminPayload
) {
  return sql<adminTable>`UPDATE admins SET ${sql(
    payload,
    "deleted_at"
  )} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

/*********************************
 * PARENT QUERIES
 *********************************/
// adding parent to db
export async function registerParentQuery(payload: familyDataPayload) {
  return sql<familydataTable>`INSERT INTO family ${sql(
    payload,
    "parent_firstname",
    "parent_lastname",
    "parent_phonenumber",
    "emergency_firstname",
    "emergency_lastname",
    "emergency_phonenumber",
    "parent_email",
    "home_address",
    "how_parent_heard_about_us",
    "city"
  )} RETURNING *`;
}

// get parent  details by id
export async function getParentByIdQuery(id: string) {
  return sql<familydataTable>`
  SELECT *
  FROM
  family 
  WHERE family_id = ${id}
  AND 
  deleted_at IS NULL`;
}

// get all parents in database
export async function getAllParentsQuery() {
  return sql<familydataTable>`
  SELECT *
  FROM
  family 
  WHERE 
  deleted_at IS NULL`;
}

// get students details by parent id
export async function getStudentsByParentIdQuery(family_id: string) {
  return sql<studentTable>`
  SELECT *
  FROM
  student 
  WHERE family_id = ${family_id}
  AND 
  deleted_at IS NULL`;
}

// get total students by parent id
export async function getTotalStudentsByParentIdQuery(family_id: string) {
  return sql<studentTable>`
  SELECT COUNT(*)
  FROM
  student 
  WHERE family_id = ${family_id}
  AND 
  deleted_at IS NULL`;
}

// updating parent info in database
export async function editParentQuery(id: string, payload: editParentPayload) {
  return sql<familydataTable>`UPDATE family SET ${sql(
    payload,
    "parent_firstname",
    "parent_lastname",
    "parent_phonenumber",
    "emergency_firstname",
    "emergency_lastname",
    "emergency_phonenumber",
    "parent_email",
    "home_address",
    "how_parent_heard_about_us",
    "city",
    "updated_at",
    "deleted_at"
  )} WHERE family_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

// delete parent
export async function deleteParentQuery(
  id: string,
  payload: editParentPayload
) {
  return sql<familydataTable>`UPDATE family SET ${sql(
    payload,
    "deleted_at"
  )} WHERE family_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

/*********************************
 * CHILD QUERIES
 *********************************/
// registering child under parent
export async function registerChildQuery(payload: childRegisterPayload) {
  return sql<studentTable>`INSERT INTO student ${sql(
    payload,
    "first_name",
    "last_name",
    "family_id",
    "date_of_birth",
    "sex"
  )} RETURNING *`;
}

// get total number of students registered
export async function getTotalOfStudentsQuery() {
  return sql<studentTable>`
  SELECT COUNT(*) 
  FROM
  student`;
}

// get total number of students for the current year
export async function getTotalOfStudentsForCurrentYearQuery() {
  return sql<studentTable>`
  SELECT COUNT(*) 
  FROM 
  student 
  WHERE 
  EXTRACT(YEAR FROM CURRENT_TIMESTAMP) - EXTRACT(YEAR FROM created_at) = 0`;
}

// get total number of students for one year back
export async function getTotalOfStudentsForOneYearBackQuery() {
  return sql<studentTable>`
  SELECT COUNT(*) 
  FROM 
  student 
  WHERE 
  EXTRACT(YEAR FROM CURRENT_TIMESTAMP) - EXTRACT(YEAR FROM created_at) = 1`;
}

// get total number of students for two years back
export async function getTotalOfStudentsForTwoYearsBackQuery() {
  return sql<studentTable>`
  SELECT COUNT(*) 
  FROM 
  student 
  WHERE 
  EXTRACT(YEAR FROM CURRENT_TIMESTAMP) - EXTRACT(YEAR FROM created_at) = 2`;
}

// get total number of students for three years back
export async function getTotalOfStudentsForThreeYearsBackQuery() {
  return sql<studentTable>`
  SELECT COUNT(*) 
  FROM 
  student 
  WHERE 
  EXTRACT(YEAR FROM CURRENT_TIMESTAMP) - EXTRACT(YEAR FROM created_at) = 3`;
}

// get total number of students for four years back
export async function getTotalOfStudentsForFourYearsBackQuery() {
  return sql<studentTable>`
  SELECT COUNT(*) 
  FROM 
  student 
  WHERE 
  EXTRACT(YEAR FROM CURRENT_TIMESTAMP) - EXTRACT(YEAR FROM created_at) = 4`;
}

// get all students in database
export async function getAllStudentsQuery() {
  return sql<studentTable>`
  SELECT *
  FROM
  student 
  WHERE 
  deleted_at IS NULL`;
}

// get student details by id
export async function getStudentByIdQuery(id: string) {
  return sql<studentTable>`
  SELECT *
  FROM
  student 
  WHERE student_id = ${id}
  AND 
  deleted_at IS NULL`;
}

// get student details by parent id
export async function getStudentByParentIdQuery(id: string) {
  return sql<studentTable>`
  SELECT *
  FROM
  student 
  WHERE family_id = ${id}
  AND 
  deleted_at IS NULL`;
}

// updating student info in database
export async function editStudentQuery(
  id: string,
  payload: editStudentPayload
) {
  return sql<studentTable>`UPDATE student SET ${sql(
    payload,
    "first_name",
    "last_name",
    "family_id",
    "date_of_birth",
    "sex",
    "updated_at",
    "deleted_at"
  )} WHERE student_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

// updating student info in database
export async function deleteStudentByParentQuery(
  id: string,
  payload: editStudentPayload
) {
  return sql<studentTable>`UPDATE student SET ${sql(
    payload,
    "deleted_at"
  )} WHERE family_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

// updating student info in database
export async function deleteStudentQuery(
  id: string,
  payload: editStudentPayload
) {
  return sql<studentTable>`UPDATE student SET ${sql(
    payload,
    "deleted_at"
  )} WHERE student_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

/**********************************************
 * LOCATION QUERIES
 ********************************************/
// adding new location to db
export async function addNewLocationQuery(payload: addNewLocationPayload) {
  return sql<locationsTable>`INSERT INTO locations ${sql(
    payload,
    "location_name",
    "location_address",
    "location_city"
  )} RETURNING *`;
}

// get all locations in database
export async function getAllLocationsQuery() {
  return sql<locationsTable>`
  SELECT *
  FROM
  locations 
  WHERE 
  deleted_at IS NULL`;
}

// get a location by id
export async function getLocationByIdQuery(id: string) {
  return sql<locationsTable>`SELECT * 
    FROM 
    locations 
    WHERE
    location_id = ${id}
    AND
    deleted_at IS NULL`;
}

// updating location in database
export async function editLocationByIdQuery(
  id: string,
  payload: editLocationPayload
) {
  return sql<locationsTable>`UPDATE locations SET ${sql(
    payload,
    "location_name",
    "location_address",
    "location_city",
    "updated_at"
  )} WHERE location_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

/**********************************************
 * COURSE QUERIES
 ********************************************/
// adding new course to db
export async function addNewCourseQuery(payload: addNewCoursePayload) {
  return sql<coursesAvailableTable>`INSERT INTO courses_available ${sql(
    payload,
    "course_name",
    "course_code"
  )} RETURNING *`;
}

// adding course to a student
export async function coursesEnrolledQuery(payload: coursesEnrolledPayload) {
  return sql<coursesEnrolledTable>`INSERT INTO courses_enrolled ${sql(
    payload,
    "student_id",
    "course_id",
    "camp_id",
    "mode",
    "location_id"
  )} RETURNING *`;
}

// course student has enrolled
export async function getCoursesEnrolledByStudentQuery(student_id: string) {
  return sql<coursesEnrolledTable>`SELECT * 
    FROM 
    courses_enrolled 
    WHERE
    student_id = ${student_id}
    AND
    deleted_at IS NULL`;
}

// total of course student has enrolled
export async function getTotalCoursesEnrolledByStudentQuery(
  student_id: string
) {
  return sql<coursesEnrolledTable>`SELECT COUNT(*) 
    FROM 
    courses_enrolled 
    WHERE
    student_id = ${student_id}
    AND
    deleted_at IS NULL`;
}

// get all courses available
export async function getAllCoursesAvailableQuery() {
  return sql<coursesAvailableTable>`
  SELECT * 
  FROM
  courses_available 
  WHERE 
  deleted_at IS NULL`;
}

// get total number of courses available
export async function getTotalOfCoursesAvailableQuery() {
  return sql<coursesAvailableTable>`
  SELECT COUNT(*) 
  FROM
  courses_available 
  WHERE 
  deleted_at IS NULL`;
}

// updating the information on a course
export async function editCourseQuery(id: string, payload: editCoursePayload) {
  return sql<coursesAvailableTable>`UPDATE  courses_available SET ${sql(
    payload,
    "course_name",
    "course_code",
    "updated_at"
  )} WHERE course_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

// updating enrolled courses in database
export async function editEnrolledCoursesByIdQuery(
  id: string,
  payload: editEnrolledCoursesPayload
) {
  return sql<coursesEnrolledTable>`UPDATE courses_enrolled SET ${sql(
    payload,
    "student_id",
    "course_id",
    "camp_id",
    "mode",
    "location_id",
    "updated_at",
    "deleted_at"
  )} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

// deleting enrolled courses in database
export async function deleteEnrolledCoursesByIdQuery(
  id: string,
  payload: editEnrolledCoursesPayload
) {
  return sql<coursesEnrolledTable>`UPDATE courses_enrolled SET ${sql(
    payload,
    "updated_at"
  )} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}

// get a particular course by ID
export async function getCourseByIdQuery(id: string) {
  return sql<coursesAvailableTable>`SELECT * FROM 
  courses_available 
  WHERE course_id = ${id} 
  AND 
  deleted_at IS NULL`;
}

// get a particular enrolled course by enrolledID
export async function getEnrolledCourseByIdQuery(id: string) {
  return sql<coursesEnrolledTable>`SELECT * FROM 
  courses_enrolled 
  WHERE id = ${id} 
  AND 
  deleted_at IS NULL`;
}

/*******************************************
 *CAMP QUERIES
 *********************************************/

// add a new camp to db
export async function addNewCampQuery(payload: addNewCampPayload) {
  return sql<campsTable>`INSERT INTO camps ${sql(
    payload,
    "camp_name"
  )} RETURNING *`;
}

// get all camp details in the data base
export async function getAllCampsQuery() {
  return sql<campsTable>`SELECT * 
  FROM camps 
  WHERE 
  deleted_at IS NULL`;
}

// get camp by id
export async function getCampByIdQuery(id: string) {
  return sql<campsTable>`
  SELECT *
  FROM
  camps
  WHERE id = ${id}
  AND 
  deleted_at IS NULL`;
}

// updating camp name in database
export async function editCampQuery(id: string, payload: editCampPayload) {
  return sql<campsTable>`UPDATE camps SET ${sql(
    payload,
    "camp_name",
    "updated_at"
  )} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
