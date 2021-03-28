// post entity (table definition) in DB

import {
    Entity,
    Column,
    PrimaryColumn,
    BeforeInsert
} from 'typeorm';
import 'reflect-metadata';

@Entity()
export default class Post
{
    @PrimaryColumn("uuid")
    id!: string;

    @Column("varchar", { length: 50 })
    title!: string;

    @Column("text")
    description!: string;

    @Column("bigint")
    finishDate!: number;

    @Column("int")
    likes!: number;

    @Column("json")
    challengers!: Array<{ 
        id: string, 
        displayName: string, 
        progress: number, 
        blurb: string,
        blurbUpdateTime: number
    }>;

    @Column("uuid")
    owner!: string;

    @Column("text")
    ownerDisplayName!: string;

    @Column("bigint")
    created!: number;

    @BeforeInsert()
    getCreatedUTC()
    {
        this.created = new Date().getTime();
    }
}