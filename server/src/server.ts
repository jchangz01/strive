// code for backend of Strive

console.log("Starting Strive backend");

// external package imports
import dotenv from 'dotenv';
import express, { Application } from 'express';
import passport from 'passport';
import 'reflect-metadata';

dotenv.config({ path: __dirname + "/../.env"});
console.log("DB_HOST", process.env.DB_HOST);
console.log("^^ if you see the correct host above, env vars are loaded");

const app: Application = express();

// internal imports


// init auth engine

// configure express