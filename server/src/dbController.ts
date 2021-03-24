// database controller for backend

import mysql, { Connection, Query } from 'mysql';

// init DB connection
const dbConInfo: Connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// establish connection to database
dbConInfo.connect(err =>
{
    if (err) { console.log("An error occurred while trying to connect to the master database"); throw err; }
    console.log("Successfully connected to master database");
});

// DB manipulation functions
// function addUser(username: string, password: string, email: string): void
// {
//     var sqlQuery: Query = `INSERT INTO users (username, password, email, data) VALUES (?, ?, ?, ?)`;
// }