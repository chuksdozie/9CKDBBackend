import httpStatus from "http-status";
import { APIError } from "../../config/error";
import {
  addNewLocationQuery,
  editLocationByIdQuery,
  getAllLocationsQuery,
  getLocationByIdQuery,
} from "../../queries";
import { now } from "../../utils";

async function addNewLocation(payload: addNewLocationPayload) {
  try {
    const [location] = await addNewLocationQuery(payload);
    return location;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get all locations in db
async function getAllLocations() {
  try {
    const location = await getAllLocationsQuery();
    return location;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

async function editLocationById(id: string, payload: editLocationPayload) {
  try {
    const locationToEdit = await getLocationByIdQuery(id);

    if (!locationToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Location to edit not found",
        message: "Location to edit not found",
      });
    }

    const editPayload = {
      location_name: payload.location_name || locationToEdit[0].location_name,
      location_address:
        payload.location_address || locationToEdit[0].location_address,
      location_city: payload.location_city || locationToEdit[0].location_city,
      updated_at: now(),
    };

    const [editedLocation] = await editLocationByIdQuery(id, editPayload);
    return editedLocation;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

export default {
  addNewLocation,
  getAllLocations,
  editLocationById,
};
