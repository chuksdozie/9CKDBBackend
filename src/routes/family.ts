import { Router } from "express";
import httpStatus from "http-status";
import family from "../controllers/family/family";
import { isSuperAdmin } from "../middlewares/auth";
import editedParent from "../controllers/family/family";
import editedStudent from "../controllers/student/student";

const router = Router();

router.post("/register/parent", async (req, res) => {
  try {
    const {
      parent_firstname,
      parent_lastname,
      parent_phonenumber,
      emergency_firstname,
      emergency_lastname,
      emergency_phonenumber,
      parent_email,
      home_address,
      city,
      how_parent_heard_about_us,
    } = req.body;

    const data = await family.registerParent({
      parent_firstname,
      parent_lastname,
      parent_phonenumber,
      emergency_firstname,
      emergency_lastname,
      emergency_phonenumber,
      parent_email,
      home_address,
      city,
      how_parent_heard_about_us,
    });

    res.status(httpStatus.CREATED).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

router.get("/parent/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await family.getParentById(id);
    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

// get all parent in db
router.get("/parents", async (_req, res) => {
  try {
    const data = await family.getAllParents();
    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

// get all students belonging to a parent in db
router.get("/parent/students/:family_id", async (req, res) => {
  try {
    const family_id = req.params.family_id;
    const data = await family.getStudentsByParentId(family_id);
    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

// get total number of students belonging to a parent in db
router.get("/parent/students/total/:family_id", async (req, res) => {
  try {
    const family_id = req.params.family_id;
    const data = await family.getTotalStudentsByParentId(family_id);
    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

/**
 * Edit a pareents details
 * Method: PUT
 * payload {Camp Id}
 */
router.put("/parent/:id", isSuperAdmin, async (req, res) => {
  try {
    const parentId = req.params.id;
    const {
      parent_firstname,
      parent_lastname,
      parent_phonenumber,
      emergency_firstname,
      emergency_lastname,
      emergency_phonenumber,
      parent_email,
      home_address,
      city,
      how_parent_heard_about_us,
    } = req.body;
    const data = await editedParent.editParent(parentId, {
      parent_firstname,
      parent_lastname,
      parent_phonenumber,
      emergency_firstname,
      emergency_lastname,
      emergency_phonenumber,
      parent_email,
      home_address,
      city,
      how_parent_heard_about_us,
    });

    res
      .status(httpStatus.OK)
      .json({ message: "parent details have been updated", data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

/**
 * Edit a pareents details
 * Method: PUT
 * payload {Camp Id}
 */
router.put("/parent/delete/:id", isSuperAdmin, async (req, res) => {
  try {
    const parentId = req.params.id;

    const datum = await editedStudent.deleteStudentByParentId(parentId);
    const data = await editedParent.deleteParent(parentId);

    res.status(httpStatus.OK).json({
      message: "parent details and children of parent has been deleted",
      data,
      datum,
    });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

export default router;
