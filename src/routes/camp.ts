import { Router } from "express";
import httpStatus from "http-status";
import camp from "../controllers/camp/camp";
import { isSuperAdmin } from "../middlewares/auth";
import editedCamp from "../controllers/camp/camp";

const router = Router();

// adding a new course to the db
router.post("/add/camp", async (req, res) => {
  try {
    const { camp_name } = req.body;
    const data = await camp.addNewCamp({
      camp_name,
    });
    res.status(httpStatus.CREATED).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

// getting all the camps in the db
router.get("/camps", async (_req, res) => {
  try {
    const data = await camp.getAllCamps();
    res.status(httpStatus.OK).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

/**
 * Edit a Camp details
 * Method: PUT
 * payload {Camp Id}
 */
router.put("/camp/:id", isSuperAdmin, async (req, res) => {
  try {
    const campId = req.params.id;
    const { camp_name } = req.body;
    const data = await editedCamp.editCamp(campId, { camp_name });

    res
      .status(httpStatus.OK)
      .json({ message: "camp name has been updated", data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

export default router;
