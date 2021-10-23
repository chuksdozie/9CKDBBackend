"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../../config/error");
const queries_1 = require("../../queries");
const utils_1 = require("../../utils");
async function addNewLocation(payload) {
    try {
        const [location] = await (0, queries_1.addNewLocationQuery)(payload);
        return location;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get all locations in db
async function getAllLocations() {
    try {
        const location = await (0, queries_1.getAllLocationsQuery)();
        return location;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
async function editLocationById(id, payload) {
    try {
        const locationToEdit = await (0, queries_1.getLocationByIdQuery)(id);
        if (!locationToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Location to edit not found",
                message: "Location to edit not found",
            });
        }
        const editPayload = {
            location_name: payload.location_name || locationToEdit[0].location_name,
            location_address: payload.location_address || locationToEdit[0].location_address,
            location_city: payload.location_city || locationToEdit[0].location_city,
            updated_at: (0, utils_1.now)(),
        };
        const [editedLocation] = await (0, queries_1.editLocationByIdQuery)(id, editPayload);
        return editedLocation;
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
    addNewLocation,
    getAllLocations,
    editLocationById,
};
//# sourceMappingURL=location.js.map