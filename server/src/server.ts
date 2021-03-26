// code for backend of Strive

console.log("Starting Strive backend");

// external package imports
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import passport from 'passport';
import { createConnection } from 'typeorm';
import ExpressMySQLSession from 'express-mysql-session';
import * as session from 'express-session';

// internal imports
import passportAuthConfig from './passportAuthConfig';
import AuthRouter from './routes/auth';
import FeedRouter from './routes/feed';
import UserRouter from './routes/user';
import PostRouter from './routes/post';

// init env vars
dotenv.config({ path: __dirname + "/../.env"});
console.log("DB_NAME", process.env.TYPEORM_DATABASE);
console.log("^^ if you see the correct host above, env vars are loaded");

// init backend
createConnection().then(async connection =>
{
    //const userRepo = connection.getRepository(User);

    console.log("Database connection established");

    // create and setup express app
    const app: Application = express();
    app.use(express.json({ limit: '5mb' }));
    app.use(express.urlencoded({ limit: '5mb', extended: false }));

    // init sessions 
    const MySQLStore = ExpressMySQLSession(session);
    const sessionStore = new MySQLStore({
        host: process.env.TYPEORM_HOST,
        user: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE
    });

    app.use(session.default({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        name: 's',
        cookie:
        {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'strict'
        }
    }));

    console.log("sessions configured");

    // init auth engine
    passportAuthConfig(passport, connection);
    app.use(passport.initialize());
    app.use(passport.session());
    console.log("Passport auth engine initialized");

    // register routes
    app.use('/auth', AuthRouter(passport, process.env.ENABLE_SESSIONS!));
    app.use('/feed', FeedRouter());
    app.use('/user', UserRouter());
    app.use('/post', PostRouter());

    // 404 route
    app.use((req: Request, res: Response) => res.status(404).json({ message: "route not found" }));

    // returns all users
    // app.get("/users", async function(req: Request, res: Response) {
    //     const users = await userRepo.find();
    //     res.json(users);
    // });

    // // returns user by IDs
    // app.get("/users/:id", async function(req: Request, res: Response) {
    //     const results = await userRepo.findOne(req.params.id);
    //     return res.send(results);
    // });

    // // save new user
    // app.post("/users", async function(req: Request, res: Response) {
        
    //     // create new user and persist to DB
    //     const user = userRepo.create(req.body);
    //     const results = await userRepo.save(user);
    //     return res.send(results);
    // });

    // // update user
    // app.put("/users/:id", async function(req: Request, res: Response) {
    //     const user = await userRepo.findOne(req.params.id);
    //     userRepo.merge(user, req.body);
    //     const results = await userRepo.save(user);
    //     return res.send(results);
    // });

    // // delete user
    // app.delete("/users/:id", async function(req: Request, res: Response) {
    //     const results = await userRepo.delete(req.params.id);
    //     return res.send(results);
    // });

    // start express server
    console.log(`Strive backend ready for requests on port ${process.env.PORT || 3000}`);
    app.listen(process.env.PORT || 3000);
});