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

    @Column("datetime")
    finishDate!: Date;

    @Column("int")
    likes!: number;

    @Column("json")
    challengers!: Array<{ id: string, displayName: string, progress: number, blurb: string }>;

    @Column("uuid")
    owner!: string;

    @Column("text")
    ownerDisplayName!: string;

    @CreateDateColumn()
    created!: Date;
}