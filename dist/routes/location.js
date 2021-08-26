"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const location_1 = __importDefault(require("../controllers/location/location"));
const location_2 = __importDefault(require("../controllers/location/location"));
const auth_1 = require("../middlewares/auth");
const router = express_1.Router();
router.post("/add/location", async (req, res) => {
    try {
        const { location_name, location_city, location_address } = req.body;
        const data = await location_1.default.addNewLocation({
            location_name,
            location_city,
            location_address,
        });
        res.status(http_status_1.default.CREATED).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
//
router.get("/locations", async (_req, res) => {
    try {
        const data = await location_1.default.getAllLocations();
        res.status(http_status_1.default.CREATED).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Edit a Location details
 * Method: PUT
 * payload {Camp Id}
 */
router.put("/location/:id", auth_1.isSuperAdmin, async (req, res) => {
    try {
        const locationId = req.params.id;
        const { location_name, location_city, location_address } = req.body;
        const data = await location_2.default.editLocationById(locationId, {
            location_name,
            location_city,
            location_address,
        });
        res
            .status(http_status_1.default.OK)
            .json({ message: "location details have been updated", data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=location.js.map