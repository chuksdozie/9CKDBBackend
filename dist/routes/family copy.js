"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const family_1 = __importDefault(require("../controllers/family/family"));
const router = express_1.Router();
router.post('/register/parent', async (req, res) => {
    try {
        const { parent_fullname, parent_phonenumber, alternative_fullname, alternative_phonenumber, parent_email, home_address, how_parent_heard_about_us } = req.body;
        const data = await family_1.default.registerParent({
            parent_fullname, parent_phonenumber,
            alternative_fullname, alternative_phonenumber,
            parent_email, home_address,
            how_parent_heard_about_us
        });
        res.status(http_status_1.default.CREATED).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=family%20copy.js.map