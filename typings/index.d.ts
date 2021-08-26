interface adminPayload {
  admin_firstname: string;
  admin_lastname: string;
  official_email: string;
  admin_phonenumber: string;
  password: string;
}

interface newAdminPayload {
  admin_firstname: string;
  admin_lastname: string;
  official_email: string;
  admin_phonenumber: string;
  password?: string;
  role?: string;
  owner?: boolean;
}

interface editAdminPayload {
  admin_firstname?: string;
  admin_lastname?: string;
  official_email?: string;
  admin_phonenumber?: string;
  password?: string;
  updated_at?: string;
}

interface deleteAdminPayload {
  admin_firstname?: string;
  admin_lastname?: string;
  official_email?: string;
  role?: string;
  deleted_at?: string;
}

interface editAdminRolePayload {
  admin_firstname?: string;
  admin_lastname?: string;
  official_email?: string;
  admin_phonenumber?: string;
  role?: string;
  updated_at?: string;
}

interface editCampPayload {
  camp_name?: string;
  updated_at?: string;
}

interface editParentPayload {
  parent_firstname?: string;
  parent_lastname?: string;
  parent_phonenumber?: string;
  emergency_firstname?: string;
  emergency_lastname?: string;
  emergency_phonenumber?: string;
  parent_email?: string;
  home_address?: string;
  city?: string;
  how_parent_heard_about_us?: string;
  updated_at?: string;
  deleted_at?: string;
}

interface verifyAdminPayload {
  official_email: string;
  verified: boolean;
}

interface adminJWTPayload {
  id: string;
  verified: boolean;
}

interface superAdminJWTPayload {
  id: string;
  role: string;
  verified: boolean;
  owner: boolean;
}

interface familyDataPayload {
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

interface childRegisterPayload {
  first_name: string;
  last_name: string;
  family_id: string;
  date_of_birth: string;
  sex: string;
}

interface editStudentPayload {
  first_name?: string;
  last_name?: string;
  family_id?: string;
  date_of_birth?: string;
  sex?: string;
  updated_at?: string;
  deleted_at?: string;
}

interface addNewLocationPayload {
  location_name: string;
  location_address: string;
  location_city: string;
}

interface editLocationPayload {
  location_name?: string;
  location_address?: string;
  location_city?: string;
  updated_at?: string;
}

interface addNewCoursePayload {
  course_name: string;
  course_code: string;
}

interface editCoursePayload {
  course_name?: string;
  course_code?: string;
  updated_at?: string;
}

interface coursesEnrolledPayload {
  student_id: string;
  course_id: string;
  camp_id: string;
  mode: string;
  location_id: string;
}

interface editEnrolledCoursesPayload {
  student_id?: string;
  course_id?: string;
  camp_id?: string;
  mode?: string;
  location_id?: string;
  updated_at?: string;
  deleted_at?: string;
}

interface addNewCampPayload {
  camp_name: string;
}
