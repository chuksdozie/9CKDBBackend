var uuid = require("uuid");
import redis, { REDIS_PREFIX } from "../../config/redis";
import argon2 from "argon2";
import { sendmailRef } from "../../config/mailer";
import {
  verifyAdminQuery,
  loginAdminQuery,
  getAdminByEmailQuery,
} from "../../queries";
import httpStatus from "http-status";
import { APIError } from "../../config/error";
import adminTable from "../../interfaces/admin";
import { sql } from "../../stores/database";
import { signAdminToken, signToken } from "../../utils/tokenUtils";
import { now } from "../../utils";

export async function sendTokenViaEmail(email: string) {
  /*
      gen token
      sensd token in mail body
    */
  const token = uuid.v4();
  const emailKey = `${REDIS_PREFIX}-${token}`;
  const mainurl = `${process.env.BASE_URL}/auth/verify/${token}`;
  redis.set(emailKey, email);
  const tokenurl = `<p>Thanks for registering, please <a href="${mainurl}", target="_blank">click here</a> to verify your email.</p>`;
  sendmailRef(email, tokenurl);
  // tokenVerification(email)
}

export async function verifyEmail(token: string) {
  try {
    const emailKey = `${REDIS_PREFIX}-${token}`;
    /*
    check if token is in redis ✅
    get email from token ✅
    verify email on table ✅
    return a response
     */
    const keyExists = await redis.exists(emailKey);
    // if key does not exist
    if (keyExists === 0) {
      throw new Error("Invalid token");
    }

    const email = (await redis.get(emailKey)) as string;
    console.log(email);
    const [verifiedUser] = await verifyAdminQuery(email);
    const tokeng = signToken({
      id: verifiedUser.id,
      verified: verifiedUser.verified,
    });
    const { password, ...rest } = verifiedUser;

    return [rest, tokeng];
  } catch (error) {
    console.error(error);
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

export async function loginAdmin(email: string, password: string) {
  /*
  get an email and password
  check if that email is in the database
  check if the email has the same password in the database
  verify if the password is equal to the password in the database
  verify if the email is equal to the email in the database
  */

  console.log(password);
  console.log(email);

  const [admin] =
    await sql<adminTable>`SELECT * FROM admins WHERE official_email = ${email}`;
  try {
    if (!admin.verified) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: "Admin not verified",
        errors: "Admin not verified",
      });
    }

    if (!admin) {
      console.log("fff");
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: "Incorrect Credentials",
        errors: "User not found",
      });
    }

    const [pass] = await loginAdminQuery(email);
    console.log(pass.password);
    console.log(pass.official_email);

    if (
      (await argon2.verify(pass.password, password)) &&
      pass.official_email == email
    ) {
      pass.logged_at = now();
      sql<adminTable>`UPDATE admins SET logged_at = ${pass.logged_at} 
        WHERE official_email = ${email}`;
      console.log("comfirmed credentials");
      const tokeng = signAdminToken({
        id: pass.id,
        role: pass.role,
        verified: pass.verified,
        owner: pass.owner,
      });
      return [pass, tokeng];
    } else {
      console.log("wrong credentials");
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: "Incorrect Credentials",
        errors: "Incorrect Credentials",
      });
    }
  } catch (error) {
    console.error(error);
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

export async function sendResetPasswordTokenViaEmail(email: string) {
  /*
      gen token
      sensd token in mail body
    */

  try {
    const [adminData] = await getAdminByEmailQuery(email);
    const id = adminData.id;
    // const token = uuid.v4();
    // const emailKey = `${REDIS_PREFIX}-${token}`;
    const mainurl = `${process.env.BASE_URL}/auth/resetpassword/${id}`;
    // redis.set(emailKey, email);
    const tokenurl = `<p>Please <a href="${mainurl}", target="_blank">click here</a> to reset your password.</p>`;
    sendmailRef(email, tokenurl);
    // tokenVerification(email)
  } catch (error) {
    console.error(error);
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}
