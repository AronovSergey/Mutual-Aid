import { IUser } from "./user.interface";

export interface IBlogEntry {
    id?: number;
    title: string;
    slug?: string;
    description: string;
    body: string;
    created?: Date;
    updated?: Date;
    likes?: number;
    headerImage?: string;
    publishedDate?: Date;
    isPublished?: boolean;
    author: IUser;
}