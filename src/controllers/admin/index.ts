import httpStatus from "http-status";
import argon2 from "argon2";
import { APIError } from "../../config/error";
import {
  addNewAdminQuery,
  deleteAdminByIdQuery,
  editAdminPasswordQuery,
  editAdminQuery,
  editAdminRoleQuery,
  getAdminByEmailQuery,
  getAdminByIdQuery,
  getAdminPasswordByIdQuery,
  getAllAdminsQuery,
  getRegularAdminsQuery,
  recentAdminLoginQuery,
  signUpAdminQuery,
  verifyAdminQuery,
} from "../../queries";
import {
  sendTokenViaEmail,
  sendResetPasswordTokenViaEmail,
} from "../auth/auth";
import { newPassword, now } from "../../utils";
import { sendmailRef } from "../../config/mailer";
import { isOwner } from "../../middlewares/auth";
// import {Request,Response} from 'express'

async function signUpAdmin(payload: adminPayload) {
  try {
    const hashedPassword = await argon2.hash(payload.password);
    const [admin] = await signUpAdminQuery({
      ...payload,
      password: hashedPassword,
    });

    sendTokenViaEmail(payload.official_email);
    console.log(payload.password);
    return admin;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

/**
create a new admin 🆗
generate a hashed password as admin password 🆗
verify the user 🆗
send the unhashed password to the admins email 🆗
**/

async function addNewAdmin(payload: newAdminPayload) {
  try {
    const password = newPassword();
    const hashedPassword = await argon2.hash(password);
    const [newAdmin] = await addNewAdminQuery({
      ...payload,
      role: "admin",
      password: hashedPassword,
    });
    const [verifiedUser] = await verifyAdminQuery(newAdmin.official_email);
    const passwordUrl = `<p>Use the following details to login to the Student Record Database<br>
      email:  <strong>${newAdmin.official_email}</strong><br>
      password:  <strong>${password}</strong><br>
      Please feel free to change your password anytime
      </p>`;
    // takes in email address and content in html
    sendmailRef(newAdmin.official_email, passwordUrl);
    console.log(verifiedUser);
    console.log(password);
    // signAdminToken({
    //   id: verifiedUser.id,
    //   role: verifiedUser.role,
    //   verified: verifiedUser.verified
    // })
    return verifiedUser;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

/**
create a new super admin 🆗
generate a hashed password as admin password 🆗
verify the user 🆗
send the unhashed password to the admins email 🆗
**/

async function addNewSuperAdmin(payload: newAdminPayload) {
  try {
    const password = newPassword();
    const hashedPassword = await argon2.hash(password);
    const [newAdmin] = await addNewAdminQuery({
      ...payload,
      role: "super admin",
      owner: false,
      password: hashedPassword,
    });
    const [verifiedUser] = await verifyAdminQuery(newAdmin.official_email);
    const passwordUrl = `<p>Use the following details to login to the Student Record Database<br>
      email:  <strong>${newAdmin.official_email}</strong><br>
      password:  <strong>${password}</strong><br>
      Please feel free to change your password anytime
      </p>`;
    // takes in email address and content in html
    sendmailRef(newAdmin.official_email, passwordUrl);
    console.log(verifiedUser);
    console.log(password);
    // signAdminToken({
    //   id: verifiedUser.id,
    //   role: verifiedUser.role,
    //   verified: verifiedUser.verified
    // })
    return verifiedUser;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get admin details by id
async function getAdminById(id: string) {
  try {
    const [admin] = await getAdminByIdQuery(id);
    return admin;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// a collection of admins recent logins
async function recentAdminLogin() {
  try {
    const admin = await recentAdminLoginQuery();
    console.log(admin);
    return admin;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// a collection of admins recent logins
async function getAllAdmins() {
  try {
    const admin = await getAllAdminsQuery();
    console.log(admin);
    return admin;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// getting all the regular admins
async function getRegularAdmins() {
  try {
    const admin = await getRegularAdminsQuery();
    console.log(admin);
    return admin;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// edit details of an admin
async function editAdminById(id: string, payload: editAdminPayload) {
  try {
    const adminToEdit = await getAdminByIdQuery(id);

    if (!adminToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Admin to edit not found",
        message: "Admin to edit not found",
      });
    }
    let hashedPassword;
    const { password } = payload;
    console.log("1");
    console.log(adminToEdit[0].password);
    console.log(adminToEdit[0].admin_lastname);
    console.log("thanks");
    console.log(password);
    if (password) {
      hashedPassword = await argon2.hash(password);
    } else {
      hashedPassword = adminToEdit[0].password;
    }

    const editPayload = {
      admin_firstname:
        payload.admin_firstname || adminToEdit[0].admin_firstname,
      admin_lastname: payload.admin_lastname || adminToEdit[0].admin_lastname,
      official_email: payload.official_email || adminToEdit[0].official_email,
      admin_phonenumber:
        payload.admin_phonenumber || adminToEdit[0].admin_phonenumber,
      password: hashedPassword,
      updated_at: now(),
    };

    const [editedAdmin] = await editAdminQuery(id, editPayload);
    const { password: _, ...rest } = editedAdmin;
    return rest;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// edit details of an admin
async function editAdminRoleById(id: string, payload: editAdminRolePayload) {
  try {
    const adminToEdit = await getAdminByIdQuery(id);

    if (!adminToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Admin to edit not found",
        message: "Admin to edit not found",
      });
    }

    const editPayload = {
      admin_firstname:
        payload.admin_firstname || adminToEdit[0].admin_firstname,
      admin_lastname: payload.admin_lastname || adminToEdit[0].admin_lastname,
      official_email: payload.official_email || adminToEdit[0].official_email,
      admin_phonenumber:
        payload.admin_phonenumber || adminToEdit[0].admin_phonenumber,
      role: payload.role || adminToEdit[0].role,
      updated_at: now(),
    };

    const [editedAdmin] = await editAdminRoleQuery(id, editPayload);
    return editedAdmin;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// edit details in a course
async function changePassword(
  id: string,
  newPassword: string,
  payload: editAdminPayload
) {
  try {
    const adminToEdit = await getAdminPasswordByIdQuery(id);

    if (!adminToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Admin to edit not found",
        message: "Admin to edit not found",
      });
    }
    let hashedPassword;
    const { password } = payload;
    if (password) {
      if (await argon2.verify(adminToEdit[0].password, password)) {
        hashedPassword = await argon2.hash(newPassword);
      } else {
        throw new APIError({
          status: httpStatus.CONFLICT,
          errors: "Password does not match current Admin password",
          message: "Password does not match current Admin password",
        });
      }
    } else {
      throw new APIError({
        status: httpStatus.CONFLICT,
        errors: "You have not confirmed you current password",
        message: "You have not confirmed you current password",
      });
    }

    const editPayload = {
      password: hashedPassword,
      updated_at: now(),
    };

    const [editedAdmin] = await editAdminPasswordQuery(id, editPayload);
    const { password: _, ...rest } = editedAdmin;
    return rest;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// send password reset token to email
async function forgotPassword(email: string) {
  try {
    const adminToEdit = await getAdminByEmailQuery(email);
    console.log(1, email);
    console.log(2, adminToEdit);

    if (!adminToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Admin not found",
        message: "Admin not found",
      });
    } else {
      sendResetPasswordTokenViaEmail(email);
    }

    return adminToEdit;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// use password reset token to set a new password
async function resetPassword(id: string, newPassword: string) {
  try {
    const adminToEdit = await getAdminByIdQuery(id);

    if (!adminToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Admin not found",
        message: "Admin not found",
      });
    }

    let hashedPassword;
    hashedPassword = await argon2.hash(newPassword);

    const editPayload = {
      password: hashedPassword,
      updated_at: now(),
    };

    const [editedAdmin] = await editAdminPasswordQuery(id, editPayload);
    const { password: _, ...rest } = editedAdmin;
    return rest;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// edit details of an admin
async function deleteAdminById(id: string, payload: deleteAdminPayload) {
  try {
    const adminToEdit = await getAdminByIdQuery(id);

    if (!adminToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Admin to edit not found",
        message: "Admin to edit not found",
      });
    }

    if (adminToEdit[0].role == "super admin") {
      isOwner;
    }

    const editPayload = {
      admin_firstname: payload.admin_firstname,
      admin_lastname: payload.admin_lastname,
      official_email: payload.official_email,
      deleted_at: now(),
    };

    const [editedAdmin] = await deleteAdminByIdQuery(id, editPayload);
    return editedAdmin;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

export default {
  signUpAdmin,
  addNewAdmin,
  addNewSuperAdmin,
  editAdminById,
  editAdminRoleById,
  getAdminById,
  recentAdminLogin,
  getAllAdmins,
  getRegularAdmins,
  changePassword,
  forgotPassword,
  resetPassword,
  deleteAdminById,
};
