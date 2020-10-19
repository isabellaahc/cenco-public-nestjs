import { Document } from "mongoose";

export interface User extends Document{
    id: string;
    email: string;
    credits: Array<object>;
}
