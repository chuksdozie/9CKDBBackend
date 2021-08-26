import httpStatus from "http-status";
import { APIError } from "../../config/error";
import {
  addNewCampQuery,
  editCampQuery,
  getAllCampsQuery,
  getCampByIdQuery,
} from "../../queries";
import { now } from "../../utils";

// adding a new course to the db
async function addNewCamp(payload: addNewCampPayload) {
  try {
    const [camp] = await addNewCampQuery(payload);
    return camp;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get all the courses to the db
async function getAllCamps() {
  try {
    const camp = await getAllCampsQuery();
    return camp;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// edit camp name details
async function editCamp(id: string, payload: editCampPayload) {
  try {
    const campToEdit = await getCampByIdQuery(id);

    if (!campToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Camp to edit not found",
        message: "Camp to edit not found",
      });
    }

    const editPayload = {
      camp_name: payload.camp_name || campToEdit[0].camp_name,
      updated_at: now(),
    };

    const [editedCamp] = await editCampQuery(id, editPayload);
    return editedCamp;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

export default {
  addNewCamp,
  getAllCamps,
  editCamp,
};
