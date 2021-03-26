// setup passport authentication
// https://github.com/ericwooley/graphql-typeorm-passport-boilerplate

import * as argon2 from 'argon2';
import { PassportStatic } from 'passport';
import User from './entity/User';
import { Connection } from 'typeorm';
import { Strategy as LocalStrategy } from 'passport-local';

export default function initPassportAuth(passport: PassportStatic, connection: Connection)
{
    // get the user's table
    const userRepo = connection.getRepository(User);

    // define authentication function
    const authenticateUser = async (email: string, password: string, done: Function) =>
    {
        // search users table for first occurrence of user that has the specified email
        let user: User | undefined = await userRepo.findOne({ email: email });

        if (!user)
        {
            return done(null, false, { message: "No user with that email exists." });
        } // first argument of done is if there was an error on server - no error, so null

        try 
        {
            const verify = await argon2.verify(user.password, password);
            
            if (verify)
            {
                console.log(`User ${user.email} has successfully logged in`);
                return done(null, user);
            }
            else
            {
                return done(null, false, { message: "Password incorrect!" });
            }
            
        } catch (e) { return done(e); /* something errored out internally, report */ }
    }

    // initialize passport
    passport.use(new LocalStrategy({ usernameField: "email"}, authenticateUser));
    passport.serializeUser((user: User, done: Function) => done(null, user.id));    // see User entity and declaration of Express.User type
    passport.deserializeUser(async (id: string, done) =>
    {
        let userById = await userRepo.findOne({ id: id });
        return done(null, userById);
    });
}