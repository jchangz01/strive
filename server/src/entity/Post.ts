// post entity (table definition) in DB

import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn
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

    @Column("text")         // update this definition when we need it
    duration!: string;

    @Column("int")
    likes!: number;

    @Column("simple-array")
    challengers!: string[];

    @Column("uuid")
    owner!: string;

    @Column("text")
    ownerDisplayName!: string;

    @Column("simple-array")
    comments!: string;

    @CreateDateColumn()
    created!: Date;
}