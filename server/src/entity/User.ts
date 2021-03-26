// user entity (table definition) in DB

import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as argon2 from 'argon2';
import 'reflect-metadata';

// see https://github.com/typeorm/typeorm/issues/2797 for why we need exclamation marks
@Entity()
export default class User
{
    @PrimaryGeneratedColumn("uuid") // generate UUID for each user
    // exclamation mark is non-null operator; this field CANNOT be null/undefined
    id!: string;

    // type in decorator is type in DB
    @Column("varchar", { length: 255, unique: true })
    email!: string;

    @Column("varchar", { length: 50 })
    displayName!: string;

    @Column("text") // text type has no length limit
    password!: string;

    @BeforeInsert()
    async hashPassword()
    {
        this.password = await argon2.hash(this.password, { type: argon2.argon2id });
    }

}

// overwrite definition for Express.User type to match the type above
// see passportAuthConfig and https://stackoverflow.com/questions/60981735/passport-express-typescript-req-user-email-undefined
declare global
{
    namespace Express
    {
        interface User
        {
            id: string;
            email: string;
            displayName: string;
            password: string;
            hashPassword: () => Promise<void>;
        }
    }
}