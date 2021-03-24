"use strict";
// code for backend of Strive
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Starting Strive backend");
// external package imports
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
dotenv_1.default.config({ path: __dirname + "/../.env" });
console.log("DB_HOST", process.env.DB_HOST);
console.log("^^ if you see the correct host above, env vars are loaded");
const app = express_1.default();
// internal imports
// init auth engine
// configure express
