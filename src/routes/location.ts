import { Router } from "express";
import httpStatus from "http-status";
import location from "../controllers/location/location";
import editedLocation from "../controllers/location/location";
import { isSuperAdmin } from "../middlewares/auth";

const router = Router();

router.post("/add/location", async (req, res) => {
  try {
    const { location_name, location_city, location_address } = req.body;
    const data = await location.addNewLocation({
      location_name,
      location_city,
      location_address,
    });

    res.status(httpStatus.CREATED).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

//
router.get("/locations", async (_req, res) => {
  try {
    const data = await location.getAllLocations();
    res.status(httpStatus.CREATED).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

/**
 * Edit a Location details
 * Method: PUT
 * payload {Camp Id}
 */
router.put("/location/:id", isSuperAdmin, async (req, res) => {
  try {
    const locationId = req.params.id;
    const { location_name, location_city, location_address } = req.body;
    const data = await editedLocation.editLocationById(locationId, {
      location_name,
      location_city,
      location_address,
    });

    res
      .status(httpStatus.OK)
      .json({ message: "location details have been updated", data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

export default router;
