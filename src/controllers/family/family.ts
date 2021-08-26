import httpStatus from "http-status";
import { APIError } from "../../config/error";
import {
  deleteParentQuery,
  editParentQuery,
  editStudentQuery,
  getAllParentsQuery,
  getParentByIdQuery,
  getStudentsByParentIdQuery,
  getTotalStudentsByParentIdQuery,
  registerParentQuery,
} from "../../queries";
import { now } from "../../utils";

async function registerParent(payload: familyDataPayload) {
  try {
    const [family] = await registerParentQuery(payload);
    return family;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

async function getParentById(family_id: string) {
  try {
    const [family] = await getParentByIdQuery(family_id);
    return family;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get all the parents controller
async function getAllParents() {
  try {
    const family = await getAllParentsQuery();
    return family;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get all the students belonging to a parent
async function getStudentsByParentId(family_id: string) {
  try {
    const family = await getStudentsByParentIdQuery(family_id);
    return family;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get all the total students belonging to  a parent
async function getTotalStudentsByParentId(family_id: string) {
  try {
    const family = await getTotalStudentsByParentIdQuery(family_id);
    return family;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// edit parent details
async function editParent(id: string, payload: editParentPayload) {
  try {
    const parentToEdit = await getParentByIdQuery(id);

    if (!parentToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Parent to edit not found",
        message: "Parent to edit not found",
      });
    }

    const editPayload = {
      parent_firstname:
        payload.parent_firstname || parentToEdit[0].parent_firstname,
      parent_lastname:
        payload.parent_lastname || parentToEdit[0].parent_lastname,
      parent_phonenumber:
        payload.parent_phonenumber || parentToEdit[0].parent_phonenumber,
      emergency_firstname:
        payload.emergency_firstname || parentToEdit[0].emergency_firstname,
      emergency_lastname:
        payload.emergency_lastname || parentToEdit[0].emergency_lastname,
      emergency_phonenumber:
        payload.emergency_phonenumber || parentToEdit[0].emergency_phonenumber,
      parent_email: payload.parent_email || parentToEdit[0].parent_email,
      home_address: payload.home_address || parentToEdit[0].home_address,
      how_parent_heard_about_us:
        payload.how_parent_heard_about_us ||
        parentToEdit[0].how_parent_heard_about_us,
      city: payload.city || parentToEdit[0].city,
      updated_at: now(),
    };

    const [editedParent] = await editParentQuery(id, editPayload);
    return editedParent;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// delete parent details
async function deleteParent(id: string) {
  try {
    const parentToEdit = await getParentByIdQuery(id);

    if (!parentToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Parent to edit not found",
        message: "Parent to edit not found",
      });
    }

    const editParentPayload = {
      deleted_at: now(),
    };

    const [editedParent] = await deleteParentQuery(id, editParentPayload);
    return editedParent;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

export default {
  registerParent,
  getParentById,
  getAllParents,
  getStudentsByParentId,
  getTotalStudentsByParentId,
  editParent,
  deleteParent,
};
