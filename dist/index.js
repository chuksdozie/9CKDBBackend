"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const auth_1 = require("./controllers/auth/auth");
const handlers_1 = require("./handlers");
const database_1 = require("./stores/database");
const tokenUtils_1 = require("./utils/tokenUtils");
const admin_1 = __importDefault(require("./routes/admin"));
const family_1 = __importDefault(require("./routes/family"));
const student_1 = __importDefault(require("./routes/student"));
const location_1 = __importDefault(require("./routes/location"));
const course_1 = __importDefault(require("./routes/course"));
const camp_1 = __importDefault(require("./routes/camp"));
const app = (0, express_1.default)();
const port = process.env.PORT || "7300";
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
(0, database_1.testDBConnection)();
app.get("/", handlers_1.rootHandler);
app.get("/hello/:name", handlers_1.helloHandler);
app.get("/signup", handlers_1.showtoken);
app.get("/test", (_, res) => (0, tokenUtils_1.sendmail)(res));
app.get("/email", auth_1.sendTokenViaEmail);
app.use("/api/auth", admin_1.default);
app.use("/api", family_1.default);
app.use("/api", student_1.default);
app.use("/api", location_1.default);
app.use("/api", course_1.default);
app.use("/api", camp_1.default);
app.listen(port, () => {
    //   if (err) return console.error(err);
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map