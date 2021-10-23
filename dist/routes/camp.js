"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const camp_1 = __importDefault(require("../controllers/camp/camp"));
const auth_1 = require("../middlewares/auth");
const camp_2 = __importDefault(require("../controllers/camp/camp"));
const router = (0, express_1.Router)();
// adding a new course to the db
router.post("/add/camp", async (req, res) => {
    try {
        const { camp_name } = req.body;
        const data = await camp_1.default.addNewCamp({
            camp_name,
        });
        res.status(http_status_1.default.CREATED).json({ data });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
// getting all the camps in the db
router.get("/camps", async (_req, res) => {
    try {
        const data = await camp_1.default.getAllCamps();
        res.status(http_status_1.default.OK).json({ data });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Edit a Camp details
 * Method: PUT
 * payload {Camp Id}
 */
router.put("/camp/:id", auth_1.isSuperAdmin, async (req, res) => {
    try {
        const campId = req.params.id;
        const { camp_name } = req.body;
        const data = await camp_2.default.editCamp(campId, { camp_name });
        res
            .status(http_status_1.default.OK)
            .json({ message: "camp name has been updated", data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=camp.js.map