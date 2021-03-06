import { role } from "./types";

export interface User {
    createdAt: any;
    uid: string;
    firstname: string;
    lastname: string;
    email: string;
    roles: role[];
}