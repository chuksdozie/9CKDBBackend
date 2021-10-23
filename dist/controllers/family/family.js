"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../../config/error");
const queries_1 = require("../../queries");
const utils_1 = require("../../utils");
async function registerParent(payload) {
    try {
        const [family] = await (0, queries_1.registerParentQuery)(payload);
        return family;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
async function getParentById(family_id) {
    try {
        const [family] = await (0, queries_1.getParentByIdQuery)(family_id);
        return family;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get all the parents controller
async function getAllParents() {
    try {
        const family = await (0, queries_1.getAllParentsQuery)();
        return family;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get all the students belonging to a parent
async function getStudentsByParentId(family_id) {
    try {
        const family = await (0, queries_1.getStudentsByParentIdQuery)(family_id);
        return family;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get all the total students belonging to  a parent
async function getTotalStudentsByParentId(family_id) {
    try {
        const family = await (0, queries_1.getTotalStudentsByParentIdQuery)(family_id);
        return family;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// edit parent details
async function editParent(id, payload) {
    try {
        const parentToEdit = await (0, queries_1.getParentByIdQuery)(id);
        if (!parentToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Parent to edit not found",
                message: "Parent to edit not found",
            });
        }
        const editPayload = {
            parent_firstname: payload.parent_firstname || parentToEdit[0].parent_firstname,
            parent_lastname: payload.parent_lastname || parentToEdit[0].parent_lastname,
            parent_phonenumber: payload.parent_phonenumber || parentToEdit[0].parent_phonenumber,
            emergency_firstname: payload.emergency_firstname || parentToEdit[0].emergency_firstname,
            emergency_lastname: payload.emergency_lastname || parentToEdit[0].emergency_lastname,
            emergency_phonenumber: payload.emergency_phonenumber || parentToEdit[0].emergency_phonenumber,
            parent_email: payload.parent_email || parentToEdit[0].parent_email,
            home_address: payload.home_address || parentToEdit[0].home_address,
            how_parent_heard_about_us: payload.how_parent_heard_about_us ||
                parentToEdit[0].how_parent_heard_about_us,
            city: payload.city || parentToEdit[0].city,
            updated_at: (0, utils_1.now)(),
        };
        const [editedParent] = await (0, queries_1.editParentQuery)(id, editPayload);
        return editedParent;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// delete parent details
async function deleteParent(id) {
    try {
        const parentToEdit = await (0, queries_1.getParentByIdQuery)(id);
        if (!parentToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Parent to edit not found",
                message: "Parent to edit not found",
            });
        }
        const editParentPayload = {
            deleted_at: (0, utils_1.now)(),
        };
        const [editedParent] = await (0, queries_1.deleteParentQuery)(id, editParentPayload);
        return editedParent;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
exports.default = {
    registerParent,
    getParentById,
    getAllParents,
    getStudentsByParentId,
    getTotalStudentsByParentId,
    editParent,
    deleteParent,
};
//# sourceMappingURL=family.js.map