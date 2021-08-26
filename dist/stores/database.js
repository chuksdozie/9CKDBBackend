"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDBConnection = exports.testDBConnection = exports.sql = void 0;
const postgres_1 = __importDefault(require("postgres"));
const IN_PROD = process.env.NODE_ENV === 'production';
exports.sql = postgres_1.default(process.env.DATABASE_URL, {
    debug: (_, query, params) => {
        if (!IN_PROD) {
            const queryString = query.split('\n').join('');
            console.log({ query: queryString, params });
        }
    },
});
function testDBConnection() {
    exports.sql `SELECT 1+1 AS result`
        .then(() => console.log('Connected to postgres'))
        .catch((err) => {
        if (!IN_PROD)
            throw Error(err);
    });
}
exports.testDBConnection = testDBConnection;
function closeDBConnection() {
    exports.sql.end().then(() => console.log('Connection to Postgres closed'));
}
exports.closeDBConnection = closeDBConnection;
//# sourceMappingURL=database.js.map