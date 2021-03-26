// comment entity (table definition) in DB

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';
import 'reflect-metadata';

@Entity()
export default class Comment
{
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("text")
    comment!: string;

    @Column("uuid")
    parentPost!: string[];

    @Column("uuid")
    owner!: string;

    @CreateDateColumn()
    created!: Date;
}