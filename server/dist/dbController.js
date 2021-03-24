"use strict";
// database controller for backend
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
// init DB connection
const dbConInfo = mysql_1.default.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
// establish connection to database
dbConInfo.connect(err => {
    if (err) {
        console.log("An error occurred while trying to connect to the master database");
        throw err;
    }
    console.log("Successfully connected to master database");
});
// DB manipulation functions
function addUser(username, password, email) {
    var sqlQuery = `INSERT INTO users (username, password, email, data) VALUES (?, ?, ?, ?)`;
}
