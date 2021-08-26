"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnrolledCourseByIdQuery = exports.getCourseByIdQuery = exports.deleteEnrolledCoursesByIdQuery = exports.editEnrolledCoursesByIdQuery = exports.editCourseQuery = exports.getTotalOfCoursesAvailableQuery = exports.getAllCoursesAvailableQuery = exports.getTotalCoursesEnrolledByStudentQuery = exports.getCoursesEnrolledByStudentQuery = exports.coursesEnrolledQuery = exports.addNewCourseQuery = exports.editLocationByIdQuery = exports.getLocationByIdQuery = exports.getAllLocationsQuery = exports.addNewLocationQuery = exports.deleteStudentQuery = exports.deleteStudentByParentQuery = exports.editStudentQuery = exports.getStudentByParentIdQuery = exports.getStudentByIdQuery = exports.getAllStudentsQuery = exports.getTotalOfStudentsForFourYearsBackQuery = exports.getTotalOfStudentsForThreeYearsBackQuery = exports.getTotalOfStudentsForTwoYearsBackQuery = exports.getTotalOfStudentsForOneYearBackQuery = exports.getTotalOfStudentsForCurrentYearQuery = exports.getTotalOfStudentsQuery = exports.registerChildQuery = exports.deleteParentQuery = exports.editParentQuery = exports.getTotalStudentsByParentIdQuery = exports.getStudentsByParentIdQuery = exports.getAllParentsQuery = exports.getParentByIdQuery = exports.registerParentQuery = exports.deleteAdminByIdQuery = exports.editAdminPasswordQuery = exports.editAdminRoleQuery = exports.editAdminQuery = exports.getRegularAdminsQuery = exports.getAdminPasswordByIdQuery = exports.getAdminByEmailQuery = exports.getAdminByIdQuery = exports.addNewAdminQuery = exports.getAllAdminsQuery = exports.recentAdminLoginQuery = exports.loginAdminQuery = exports.verifyAdminQuery = exports.verifyOwnerAdminQuery = exports.signUpAdminQuery = void 0;
exports.editCampQuery = exports.getCampByIdQuery = exports.getAllCampsQuery = exports.addNewCampQuery = void 0;
const database_1 = require("../stores/database");
/*
query for user to signup
 - get user details
 - send it to the database
*/
// signing up an admin
async function signUpAdminQuery(payload) {
    return database_1.sql `INSERT INTO admins ${database_1.sql(payload, "admin_firstname", "admin_lastname", "admin_phonenumber", "official_email", "password")} RETURNING *`;
}
exports.signUpAdminQuery = signUpAdminQuery;
// verifying the email of the owner
async function verifyOwnerAdminQuery(email) {
    return database_1.sql `UPDATE admins SET 
  verified = ${true}, owner = ${true}
  WHERE official_email = ${email} 
  AND 
  deleted_at IS NULL 
  RETURNING *`;
}
exports.verifyOwnerAdminQuery = verifyOwnerAdminQuery;
// verifying the email of the owner
async function verifyAdminQuery(email) {
    return database_1.sql `UPDATE admins SET 
  verified = ${true}
  WHERE official_email = ${email} 
  AND 
  deleted_at IS NULL 
  RETURNING *`;
}
exports.verifyAdminQuery = verifyAdminQuery;
// logging in an admin
async function loginAdminQuery(email) {
    return database_1.sql `SELECT * FROM admins
  WHERE official_email = ${email}
  AND 
  deleted_at IS NULL`;
}
exports.loginAdminQuery = loginAdminQuery;
// a list of recent admin logins
async function recentAdminLoginQuery() {
    return database_1.sql `SELECT 
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
exports.recentAdminLoginQuery = recentAdminLoginQuery;
// a list of recent admin logins
async function getAllAdminsQuery() {
    return database_1.sql `SELECT *
  FROM admins
  WHERE 
  deleted_at IS NULL
  ORDER BY created_at DESC`;
}
exports.getAllAdminsQuery = getAllAdminsQuery;
// owner IS NOT true
// AND
// adding a new admin to db
async function addNewAdminQuery(payload) {
    return database_1.sql `INSERT INTO admins ${database_1.sql(payload, "admin_firstname", "admin_lastname", "admin_phonenumber", "official_email", "password", "role")} RETURNING *`;
}
exports.addNewAdminQuery = addNewAdminQuery;
// get admin  details by id
async function getAdminByIdQuery(admin_id) {
    return database_1.sql `
  SELECT 
  admin_firstname, admin_lastname, admin_phonenumber, official_email, role ,password
  FROM
  admins 
  WHERE id = ${admin_id}
  AND 
  deleted_at IS NULL`;
}
exports.getAdminByIdQuery = getAdminByIdQuery;
// get admin  details by id
async function getAdminByEmailQuery(email) {
    return database_1.sql `
  SELECT * FROM
  admins 
  WHERE official_email = ${email}
  AND 
  deleted_at IS NULL`;
}
exports.getAdminByEmailQuery = getAdminByEmailQuery;
// get admin  password by id
async function getAdminPasswordByIdQuery(admin_id) {
    return database_1.sql `
  SELECT 
  password
  FROM
  admins 
  WHERE id = ${admin_id}
  AND 
  deleted_at IS NULL`;
}
exports.getAdminPasswordByIdQuery = getAdminPasswordByIdQuery;
// get all regular admin  details
async function getRegularAdminsQuery() {
    return database_1.sql `
  SELECT 
  admin_firstname, admin_lastname, admin_phonenumber, official_email
  FROM
  admins 
  WHERE role = 'admin'
  AND 
  deleted_at IS NULL`;
}
exports.getRegularAdminsQuery = getRegularAdminsQuery;
// updating the admin information in dashboard
async function editAdminQuery(id, payload) {
    return database_1.sql `UPDATE admins SET ${database_1.sql(payload, "admin_firstname", "admin_lastname", "admin_phonenumber", "official_email", "password", "updated_at")} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.editAdminQuery = editAdminQuery;
// updating the admin information in dashboard
async function editAdminRoleQuery(id, payload) {
    return database_1.sql `UPDATE admins SET ${database_1.sql(payload, "admin_firstname", "admin_lastname", "admin_phonenumber", "official_email", "role", "updated_at")} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.editAdminRoleQuery = editAdminRoleQuery;
// updating the admin information in dashboard
async function editAdminPasswordQuery(id, payload) {
    return database_1.sql `UPDATE admins SET ${database_1.sql(payload, "password", "updated_at")} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.editAdminPasswordQuery = editAdminPasswordQuery;
// delete an admin by id
async function deleteAdminByIdQuery(id, payload) {
    return database_1.sql `UPDATE admins SET ${database_1.sql(payload, "deleted_at")} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.deleteAdminByIdQuery = deleteAdminByIdQuery;
/*********************************
 * PARENT QUERIES
 *********************************/
// adding parent to db
async function registerParentQuery(payload) {
    return database_1.sql `INSERT INTO family ${database_1.sql(payload, "parent_firstname", "parent_lastname", "parent_phonenumber", "emergency_firstname", "emergency_lastname", "emergency_phonenumber", "parent_email", "home_address", "how_parent_heard_about_us", "city")} RETURNING *`;
}
exports.registerParentQuery = registerParentQuery;
// get parent  details by id
async function getParentByIdQuery(id) {
    return database_1.sql `
  SELECT *
  FROM
  family 
  WHERE family_id = ${id}
  AND 
  deleted_at IS NULL`;
}
exports.getParentByIdQuery = getParentByIdQuery;
// get all parents in database
async function getAllParentsQuery() {
    return database_1.sql `
  SELECT *
  FROM
  family 
  WHERE 
  deleted_at IS NULL`;
}
exports.getAllParentsQuery = getAllParentsQuery;
// get students details by parent id
async function getStudentsByParentIdQuery(family_id) {
    return database_1.sql `
  SELECT *
  FROM
  student 
  WHERE family_id = ${family_id}
  AND 
  deleted_at IS NULL`;
}
exports.getStudentsByParentIdQuery = getStudentsByParentIdQuery;
// get total students by parent id
async function getTotalStudentsByParentIdQuery(family_id) {
    return database_1.sql `
  SELECT COUNT(*)
  FROM
  student 
  WHERE family_id = ${family_id}
  AND 
  deleted_at IS NULL`;
}
exports.getTotalStudentsByParentIdQuery = getTotalStudentsByParentIdQuery;
// updating parent info in database
async function editParentQuery(id, payload) {
    return database_1.sql `UPDATE family SET ${database_1.sql(payload, "parent_firstname", "parent_lastname", "parent_phonenumber", "emergency_firstname", "emergency_lastname", "emergency_phonenumber", "parent_email", "home_address", "how_parent_heard_about_us", "city", "updated_at", "deleted_at")} WHERE family_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.editParentQuery = editParentQuery;
// delete parent
async function deleteParentQuery(id, payload) {
    return database_1.sql `UPDATE family SET ${database_1.sql(payload, "deleted_at")} WHERE family_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.deleteParentQuery = deleteParentQuery;
/*********************************
 * CHILD QUERIES
 *********************************/
// registering child under parent
async function registerChildQuery(payload) {
    return database_1.sql `INSERT INTO student ${database_1.sql(payload, "first_name", "last_name", "family_id", "date_of_birth", "sex")} RETURNING *`;
}
exports.registerChildQuery = registerChildQuery;
// get total number of students registered
async function getTotalOfStudentsQuery() {
    return database_1.sql `
  SELECT COUNT(*) 
  FROM
  student`;
}
exports.getTotalOfStudentsQuery = getTotalOfStudentsQuery;
// get total number of students for the current year
async function getTotalOfStudentsForCurrentYearQuery() {
    return database_1.sql `
  SELECT COUNT(*) 
  FROM 
  student 
  WHERE 
  EXTRACT(YEAR FROM CURRENT_TIMESTAMP) - EXTRACT(YEAR FROM created_at) = 0`;
}
exports.getTotalOfStudentsForCurrentYearQuery = getTotalOfStudentsForCurrentYearQuery;
// get total number of students for one year back
async function getTotalOfStudentsForOneYearBackQuery() {
    return database_1.sql `
  SELECT COUNT(*) 
  FROM 
  student 
  WHERE 
  EXTRACT(YEAR FROM CURRENT_TIMESTAMP) - EXTRACT(YEAR FROM created_at) = 1`;
}
exports.getTotalOfStudentsForOneYearBackQuery = getTotalOfStudentsForOneYearBackQuery;
// get total number of students for two years back
async function getTotalOfStudentsForTwoYearsBackQuery() {
    return database_1.sql `
  SELECT COUNT(*) 
  FROM 
  student 
  WHERE 
  EXTRACT(YEAR FROM CURRENT_TIMESTAMP) - EXTRACT(YEAR FROM created_at) = 2`;
}
exports.getTotalOfStudentsForTwoYearsBackQuery = getTotalOfStudentsForTwoYearsBackQuery;
// get total number of students for three years back
async function getTotalOfStudentsForThreeYearsBackQuery() {
    return database_1.sql `
  SELECT COUNT(*) 
  FROM 
  student 
  WHERE 
  EXTRACT(YEAR FROM CURRENT_TIMESTAMP) - EXTRACT(YEAR FROM created_at) = 3`;
}
exports.getTotalOfStudentsForThreeYearsBackQuery = getTotalOfStudentsForThreeYearsBackQuery;
// get total number of students for four years back
async function getTotalOfStudentsForFourYearsBackQuery() {
    return database_1.sql `
  SELECT COUNT(*) 
  FROM 
  student 
  WHERE 
  EXTRACT(YEAR FROM CURRENT_TIMESTAMP) - EXTRACT(YEAR FROM created_at) = 4`;
}
exports.getTotalOfStudentsForFourYearsBackQuery = getTotalOfStudentsForFourYearsBackQuery;
// get all students in database
async function getAllStudentsQuery() {
    return database_1.sql `
  SELECT *
  FROM
  student 
  WHERE 
  deleted_at IS NULL`;
}
exports.getAllStudentsQuery = getAllStudentsQuery;
// get student details by id
async function getStudentByIdQuery(id) {
    return database_1.sql `
  SELECT *
  FROM
  student 
  WHERE student_id = ${id}
  AND 
  deleted_at IS NULL`;
}
exports.getStudentByIdQuery = getStudentByIdQuery;
// get student details by parent id
async function getStudentByParentIdQuery(id) {
    return database_1.sql `
  SELECT *
  FROM
  student 
  WHERE family_id = ${id}
  AND 
  deleted_at IS NULL`;
}
exports.getStudentByParentIdQuery = getStudentByParentIdQuery;
// updating student info in database
async function editStudentQuery(id, payload) {
    return database_1.sql `UPDATE student SET ${database_1.sql(payload, "first_name", "last_name", "family_id", "date_of_birth", "sex", "updated_at", "deleted_at")} WHERE student_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.editStudentQuery = editStudentQuery;
// updating student info in database
async function deleteStudentByParentQuery(id, payload) {
    return database_1.sql `UPDATE student SET ${database_1.sql(payload, "deleted_at")} WHERE family_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.deleteStudentByParentQuery = deleteStudentByParentQuery;
// updating student info in database
async function deleteStudentQuery(id, payload) {
    return database_1.sql `UPDATE student SET ${database_1.sql(payload, "deleted_at")} WHERE student_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.deleteStudentQuery = deleteStudentQuery;
/**********************************************
 * LOCATION QUERIES
 ********************************************/
// adding new location to db
async function addNewLocationQuery(payload) {
    return database_1.sql `INSERT INTO locations ${database_1.sql(payload, "location_name", "location_address", "location_city")} RETURNING *`;
}
exports.addNewLocationQuery = addNewLocationQuery;
// get all locations in database
async function getAllLocationsQuery() {
    return database_1.sql `
  SELECT *
  FROM
  locations 
  WHERE 
  deleted_at IS NULL`;
}
exports.getAllLocationsQuery = getAllLocationsQuery;
// get a location by id
async function getLocationByIdQuery(id) {
    return database_1.sql `SELECT * 
    FROM 
    locations 
    WHERE
    location_id = ${id}
    AND
    deleted_at IS NULL`;
}
exports.getLocationByIdQuery = getLocationByIdQuery;
// updating location in database
async function editLocationByIdQuery(id, payload) {
    return database_1.sql `UPDATE locations SET ${database_1.sql(payload, "location_name", "location_address", "location_city", "updated_at")} WHERE location_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.editLocationByIdQuery = editLocationByIdQuery;
/**********************************************
 * COURSE QUERIES
 ********************************************/
// adding new course to db
async function addNewCourseQuery(payload) {
    return database_1.sql `INSERT INTO courses_available ${database_1.sql(payload, "course_name", "course_code")} RETURNING *`;
}
exports.addNewCourseQuery = addNewCourseQuery;
// adding course to a student
async function coursesEnrolledQuery(payload) {
    return database_1.sql `INSERT INTO courses_enrolled ${database_1.sql(payload, "student_id", "course_id", "camp_id", "mode", "location_id")} RETURNING *`;
}
exports.coursesEnrolledQuery = coursesEnrolledQuery;
// course student has enrolled
async function getCoursesEnrolledByStudentQuery(student_id) {
    return database_1.sql `SELECT * 
    FROM 
    courses_enrolled 
    WHERE
    student_id = ${student_id}
    AND
    deleted_at IS NULL`;
}
exports.getCoursesEnrolledByStudentQuery = getCoursesEnrolledByStudentQuery;
// total of course student has enrolled
async function getTotalCoursesEnrolledByStudentQuery(student_id) {
    return database_1.sql `SELECT COUNT(*) 
    FROM 
    courses_enrolled 
    WHERE
    student_id = ${student_id}
    AND
    deleted_at IS NULL`;
}
exports.getTotalCoursesEnrolledByStudentQuery = getTotalCoursesEnrolledByStudentQuery;
// get all courses available
async function getAllCoursesAvailableQuery() {
    return database_1.sql `
  SELECT * 
  FROM
  courses_available 
  WHERE 
  deleted_at IS NULL`;
}
exports.getAllCoursesAvailableQuery = getAllCoursesAvailableQuery;
// get total number of courses available
async function getTotalOfCoursesAvailableQuery() {
    return database_1.sql `
  SELECT COUNT(*) 
  FROM
  courses_available 
  WHERE 
  deleted_at IS NULL`;
}
exports.getTotalOfCoursesAvailableQuery = getTotalOfCoursesAvailableQuery;
// updating the information on a course
async function editCourseQuery(id, payload) {
    return database_1.sql `UPDATE  courses_available SET ${database_1.sql(payload, "course_name", "course_code", "updated_at")} WHERE course_id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.editCourseQuery = editCourseQuery;
// updating enrolled courses in database
async function editEnrolledCoursesByIdQuery(id, payload) {
    return database_1.sql `UPDATE courses_enrolled SET ${database_1.sql(payload, "student_id", "course_id", "camp_id", "mode", "location_id", "updated_at", "deleted_at")} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.editEnrolledCoursesByIdQuery = editEnrolledCoursesByIdQuery;
// deleting enrolled courses in database
async function deleteEnrolledCoursesByIdQuery(id, payload) {
    return database_1.sql `UPDATE courses_enrolled SET ${database_1.sql(payload, "updated_at")} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.deleteEnrolledCoursesByIdQuery = deleteEnrolledCoursesByIdQuery;
// get a particular course by ID
async function getCourseByIdQuery(id) {
    return database_1.sql `SELECT * FROM 
  courses_available 
  WHERE course_id = ${id} 
  AND 
  deleted_at IS NULL`;
}
exports.getCourseByIdQuery = getCourseByIdQuery;
// get a particular enrolled course by enrolledID
async function getEnrolledCourseByIdQuery(id) {
    return database_1.sql `SELECT * FROM 
  courses_enrolled 
  WHERE id = ${id} 
  AND 
  deleted_at IS NULL`;
}
exports.getEnrolledCourseByIdQuery = getEnrolledCourseByIdQuery;
/*******************************************
 *CAMP QUERIES
 *********************************************/
// add a new camp to db
async function addNewCampQuery(payload) {
    return database_1.sql `INSERT INTO camps ${database_1.sql(payload, "camp_name")} RETURNING *`;
}
exports.addNewCampQuery = addNewCampQuery;
// get all camp details in the data base
async function getAllCampsQuery() {
    return database_1.sql `SELECT * 
  FROM camps 
  WHERE 
  deleted_at IS NULL`;
}
exports.getAllCampsQuery = getAllCampsQuery;
// get camp by id
async function getCampByIdQuery(id) {
    return database_1.sql `
  SELECT *
  FROM
  camps
  WHERE id = ${id}
  AND 
  deleted_at IS NULL`;
}
exports.getCampByIdQuery = getCampByIdQuery;
// updating camp name in database
async function editCampQuery(id, payload) {
    return database_1.sql `UPDATE camps SET ${database_1.sql(payload, "camp_name", "updated_at")} WHERE id = ${id}
  AND 
  deleted_at IS NULL
  RETURNING *`;
}
exports.editCampQuery = editCampQuery;
//# sourceMappingURL=index.js.map