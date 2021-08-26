import { Router } from "express";
import admin from "../controllers/admin";
import editedAdmin from "../controllers/admin";
import adminToEdit from "../controllers/admin";
// import verify from '../controllers/admin'
import httpStatus from "http-status";
import { loginAdmin, verifyEmail } from "../controllers/auth/auth";
import {
  AdminRequest,
  isAdmin,
  isOwner,
  isSuperAdmin,
} from "../middlewares/auth";

const router = Router();

/**
 * Add an admin
 * Method: POST
 * payload {admin information}
 */
router.post("/create", async (req, res) => {
  try {
    const {
      admin_firstname,
      admin_lastname,
      admin_phonenumber,
      official_email,
      password,
    } = req.body;
    const data = await admin.signUpAdmin({
      admin_firstname,
      admin_lastname,
      admin_phonenumber,
      official_email,
      password,
    });
    res.status(httpStatus.CREATED).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

router.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const data = await verifyEmail(token);
    res.status(httpStatus.CREATED).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

router.post("/login", async (req, res) => {
  try {
    const { official_email, password } = req.body;
    const data = await loginAdmin(official_email, password);
    res.status(httpStatus.CREATED).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

router.post("/create/newadmin", isSuperAdmin, async (req, res) => {
  try {
    const {
      admin_firstname,
      admin_lastname,
      admin_phonenumber,
      official_email,
    } = req.body;
    const data = await admin.addNewAdmin({
      admin_firstname,
      admin_lastname,
      admin_phonenumber,
      official_email,
    });
    res.status(httpStatus.CREATED).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

router.post("/create/newsuperadmin", isOwner, async (req, res) => {
  try {
    const {
      admin_firstname,
      admin_lastname,
      admin_phonenumber,
      official_email,
    } = req.body;
    const data = await admin.addNewSuperAdmin({
      admin_firstname,
      admin_lastname,
      admin_phonenumber,
      official_email,
    });
    res.status(httpStatus.CREATED).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

router.get("/admin/:id", isAdmin, async (req: AdminRequest, res) => {
  try {
    const id = req.admin!.id;
    const data = await admin.getAdminById(id);
    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

router.get("/admins/recentlogin", isSuperAdmin, async (_req, res) => {
  try {
    const data = await admin.recentAdminLogin();
    console.log(data);
    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

router.get("/admins/all", isOwner, async (_req, res) => {
  try {
    const data = await admin.getAllAdmins();
    console.log(data);
    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

// get all the regular admins
router.get("/admins/regular", async (_req, res) => {
  try {
    const data = await admin.getRegularAdmins();
    console.log(data);
    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

/**
 * Edit a Admin's role
 * Method: PUT
 * payload {Admin Id}
 */
router.put("/admin/edit/adminrole/:adminId", isOwner, async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const {
      admin_firstname,
      admin_lastname,
      official_email,
      admin_phonenumber,
      role,
    } = req.body;
    const data = await editedAdmin.editAdminRoleById(adminId, {
      admin_firstname,
      admin_lastname,
      official_email,
      admin_phonenumber,
      role,
    });

    res
      .status(httpStatus.OK)
      .json({ message: `${admin_firstname} is now ${data.role}`, data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

/**
 * Edit a Admin's details
 * Method: PUT
 * payload {Admin Id}
 */
router.put(
  "/admin/edit/:adminId",
  isAdmin || isSuperAdmin,
  async (req, res) => {
    try {
      const adminId = req.params.adminId;
      const {
        admin_firstname,
        admin_lastname,
        official_email,
        admin_phonenumber,
        password,
      } = req.body;
      const data = await editedAdmin.editAdminById(adminId, {
        admin_firstname,
        admin_lastname,
        official_email,
        admin_phonenumber,
        password,
      });

      res
        .status(httpStatus.OK)
        .json({ message: "your details have been updated", data });
      return;
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
      return;
    }
  }
);

/**
 * Delete an Admin
 * Method: PUT
 * payload {Admin Id}
 */
router.put("/admin/delete/:adminId", isSuperAdmin, async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const { official_email } = req.body;
    const data = await editedAdmin.deleteAdminById(adminId, {
      official_email,
    });

    res.status(httpStatus.OK).json({ message: "admin has been removed", data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

/**
 * Edit a Admin's details
 * Method: PUT
 * payload {Admin Id}
 */
router.put(
  "/admin/changepassword/:adminId",
  isAdmin || isSuperAdmin,
  async (req, res) => {
    try {
      const adminId = req.params.adminId;
      const { password, newPassword } = req.body;
      const data = await editedAdmin.changePassword(adminId, newPassword, {
        password,
      });

      res
        .status(httpStatus.OK)
        .json({ message: "password change was successful", data });
      return;
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
      return;
    }
  }
);

router.get("/forgotpassword", async (req, res) => {
  try {
    const { official_email } = req.body;
    const [data] = await adminToEdit.forgotPassword(official_email);
    res.status(httpStatus.OK).json({
      message: `Password reset email has been sent to ${data.official_email}`,
      data,
    });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

/**
 * reset Admin's password
 * Method: PUT
 * payload {Admin Id}
 */
router.put("/resetpassword/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const { newPassword } = req.body;
    const data = await editedAdmin.resetPassword(adminId, newPassword);

    res
      .status(httpStatus.OK)
      .json({ message: "password reset was successful", data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

export default router;
