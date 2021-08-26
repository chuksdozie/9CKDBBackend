import { Request, Response } from 'express';
import {HelloResponse} from './interfaces/test'
// import adminTable from './interfaces/admin';
var uuid = require('uuid');


type HelloBuilder = (name: string) => HelloResponse;

const helloBuilder: HelloBuilder = name => ({ hello: name });


export const rootHandler = (_req: Request, res: Response) => {
  return res.send('API is perfectly working 🤓');
};

export const helloHandler = (req: Request, _res: Response) => {
  const { params } = req;
  const { name = 'World' } = params;
  helloBuilder(name);
}

export const showtoken = (req:Request,res:Response) => {
  const {params} = req;

  const generatedToken = () => {
  let token = uuid.v4()
  return token
  }

  const {name=generatedToken()} = params;
  return res.send(`token is ${name}`)
}





