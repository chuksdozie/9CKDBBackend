require("dotenv").config();
import express from "express";
import { sendTokenViaEmail } from "./controllers/auth/auth";
import { rootHandler, helloHandler, showtoken } from "./handlers";
import { testDBConnection } from "./stores/database";
import { sendmail } from "./utils/tokenUtils";
import authRouter from "./routes/admin";
import familyRouter from "./routes/family";
import childRouter from "./routes/student";
import locationRouter from "./routes/location";
import courseRouter from "./routes/course";
import campRouter from "./routes/camp";

const app = express();
const port = process.env.PORT || "7300";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
});

testDBConnection();

app.get("/", rootHandler);
app.get("/hello/:name", helloHandler);
app.get("/signup", showtoken);
app.get("/test", (_, res) => sendmail(res));
app.get("/email", sendTokenViaEmail);
app.use("/api/auth", authRouter);
app.use("/api", familyRouter);
app.use("/api", childRouter);
app.use("/api", locationRouter);
app.use("/api", courseRouter);
app.use("/api", campRouter);

app.listen(port, () => {
  //   if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});
