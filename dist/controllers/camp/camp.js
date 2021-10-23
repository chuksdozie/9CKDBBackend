"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../../config/error");
const queries_1 = require("../../queries");
const utils_1 = require("../../utils");
// adding a new course to the db
async function addNewCamp(payload) {
    try {
        const [camp] = await (0, queries_1.addNewCampQuery)(payload);
        return camp;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get all the courses to the db
async function getAllCamps() {
    try {
        const camp = await (0, queries_1.getAllCampsQuery)();
        return camp;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// edit camp name details
async function editCamp(id, payload) {
    try {
        const campToEdit = await (0, queries_1.getCampByIdQuery)(id);
        if (!campToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Camp to edit not found",
                message: "Camp to edit not found",
            });
        }
        const editPayload = {
            camp_name: payload.camp_name || campToEdit[0].camp_name,
            updated_at: (0, utils_1.now)(),
        };
        const [editedCamp] = await (0, queries_1.editCampQuery)(id, editPayload);
        return editedCamp;
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
    addNewCamp,
    getAllCamps,
    editCamp,
};
//# sourceMappingURL=camp.js.map