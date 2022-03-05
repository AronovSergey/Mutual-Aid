import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IBlogEntry } from "@mutual-aid/interfaces";
import { User } from "../user/user.entity";

@Entity()
export class BlogEntry implements IBlogEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column({ default: '' })
    description: string;

    @Column({ default: '' })
    body: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updated: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated = new Date();
    }

    @Column({ default: 0 })
    likes: number;

    @Column()
    headerImage: string;

    @Column()
    publishedDate: Date;

    @Column()
    isPublished: boolean;

    @ManyToOne(type => User, user => user.blogEntries)
    author: User;
}