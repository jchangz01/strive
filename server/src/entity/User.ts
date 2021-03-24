import { Entity, Column, PrimaryColumn, BeforeInsert, BaseEntity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

// user entity (table definition) in DB
// see https://github.com/typeorm/typeorm/issues/2797 for why we need exclamation marks
@Entity()
export class User extends BaseEntity
{
    @PrimaryColumn("uuid")
    id!: string;                            // exclamation mark is non-null operator; this field CANNOT be null/undefined

    @Column("varchar", { length: 255 })     // type in decorator is type in DB
    email!: string;

    @Column("text")                         // text type has no length limit
    password!: string;

    @BeforeInsert()                         // runs before the addition of a new user
    addId()
    {
        this.id = uuidv4();                 // set UUID for incoming new user
    }
}