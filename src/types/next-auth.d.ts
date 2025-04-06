import "next-auth";
import { DefaultSession } from "next-auth";
import {Profile as DefaultProfile} from "next-auth"

declare module "next-auth" {
  interface Profile extends DefaultProfile{
    picture?: string
  }
  interface User {
     id?:string
    _id?: string;
    image?: string ;
    name?: string;
  }
  interface Session {
    user: {
      _id?: string;
      image?: string;
      name? : string,
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    image?: string;
    name?: string;
  }
}