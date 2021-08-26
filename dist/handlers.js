"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showtoken = exports.helloHandler = exports.rootHandler = void 0;
// import adminTable from './interfaces/admin';
var uuid = require('uuid');
const helloBuilder = name => ({ hello: name });
const rootHandler = (_req, res) => {
    return res.send('API is perfectly working 🤓');
};
exports.rootHandler = rootHandler;
const helloHandler = (req, _res) => {
    const { params } = req;
    const { name = 'World' } = params;
    helloBuilder(name);
};
exports.helloHandler = helloHandler;
const showtoken = (req, res) => {
    const { params } = req;
    const generatedToken = () => {
        let token = uuid.v4();
        return token;
    };
    const { name = generatedToken() } = params;
    return res.send(`token is ${name}`);
};
exports.showtoken = showtoken;
//# sourceMappingURL=handlers.js.map