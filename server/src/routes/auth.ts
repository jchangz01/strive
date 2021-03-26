// all routes for authentication (login & signup)

import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import User from '../entity/User';
import { PassportStatic } from 'passport';

export default function AuthRouter(passport: PassportStatic)
{
    const router = Router();

    // login
    router.post('/login', async (req: Request, res: Response, next: Function) =>
    {
        if (req.isAuthenticated())
        {
            res.status(400).json({ message: "User already logged in", success: false });
        }

        // attempt authentication
        passport.authenticate('local', (err, user) =>
        {
            if (err) 
            { 
                res.status(500).json({ message: err, success: false }); 
            }
            if (!user)
            {
                res.status(400).json({ message: "Username and password combination incorrect", success: false });
            }
            else
            {
                req.login(user, err2 =>
                {
                    if (err2)
                    {
                        res.status(500).json({ message: err, success: false });
                    } 
                    else
                    {
                        res.status(200).json({ message: "User successfully logged in", success: true });
                    }
    
                });
            }
        })(req, res, next); // NEED TO INVOKE IF WE HAVE IT WITHIN A ROUTE HANDLER!!
    });

    // signup
    router.post('/signup', async (req: Request, res: Response) =>
    {
        console.log("signup route hit", req.body);

        const userRepo = getConnection().getRepository(User);

        // make sure the account to be created doesn't exist already (email & displayName)
        let userLookupEmail = await userRepo.findOne({ email: req.body.email });
        let userLookupDName = await userRepo.findOne({ displayName: req.body.username });

        if (userLookupEmail)
        {
            res.status(400).json({ message: "An account with that email already exists", success: false });
        }
        else if (userLookupDName)
        {
            res.status(400).json({ message: "An account with that username already exists", success: false });
        }
        else /* do password and rePassword validation on client side */ 
        {
            const user = userRepo.create({ 
                email: req.body.email,
                displayName: req.body.username,
                password: req.body.password
            });

            await userRepo.save(user);

            res.status(200).json({ message: "Account successfully created", success: true });
        }
    });

    // logout
    router.get('/logout', (req: Request, res: Response) =>
    {
        if (req.user)
        {
            req.logOut();
            res.status(200).json({ message: "User logged out successfully" });
        }
        else
        {
            res.status(400).json({ message: "No user logged in" });
        }
    });

    return router;
} 