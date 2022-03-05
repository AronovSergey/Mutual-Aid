import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { UserRole } from '@mutual-aid/enums';
import { IUser } from '@mutual-aid/interfaces';
import { BlogEntry } from '../blog/blog-entry.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(type => BlogEntry, blog => blog.author)
  blogEntries: BlogEntry[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
