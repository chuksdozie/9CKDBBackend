import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { APIError } from '../config/error';
const nodemailer = require('nodemailer');

/**
 * A function to encode user details in a token
 * @param payload User object to sign
 */
export function signToken(payload: adminJWTPayload) {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new APIError({
      status: 400,
      message: 'Token secret not found',
      errors: 'No token secret',
    });
  return jwt.sign(payload, secret, { expiresIn: '1d' }) ;
}

/**
 * A function to encode user details in a token
 * @param payload User object to sign
 */
 export function signAdminToken(payload: superAdminJWTPayload) {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new APIError({
      status: 400,
      message: 'Token secret not found',
      errors: 'No token secret',
    });
  return jwt.sign(payload, secret, { expiresIn: '1d' }) ;
}

/**
 * A fn to decode token into user ID or object
 * @param token Token to decode
 */
export function getUserFromToken(token: string) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret)
      throw new APIError({
        status: 400,
        message: 'Token secret not found',
        errors: 'No token secret',
      });

    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (error) {
    console.error(error);
    throw new APIError({
      message: error.message,
      status: 500,
    });
  }
}

export function sendmail (res:Response){
  const mailTransporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'orval.jacobi67@ethereal.email',
        pass: 'Ttn5RN9BJRT4CJ7zws'
    }
});
  
  
  let mailDetails = {
    from: 'orval.jacobi67@ethereal.email',
    to: 'chuksdozie48@gmail.com',
    subject: 'Test mail',
    html: `<p>Thanks for registering, please <a href="http://localhost:4500/">click here</a> to verify your email.</p>`,
  };

  mailTransporter.sendMail(mailDetails, function(err:any, _data:string) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
        res.send(`Verification mail has been sent to ${mailDetails.to}`)
    }
  });
}