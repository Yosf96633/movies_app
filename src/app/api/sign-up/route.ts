import { connectDB } from "@/lib/connectDB";
import { userModel } from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req:NextRequest) => {
    await connectDB();
    try {
        const {name , email , password} = await req.json();
     const user = await userModel.findOne({email});
     if(user){
     return NextResponse.json({message:`User already exist with email ${email}` , success:false} , {status:400})
     }
     const hashedPassword = await bcrypt.hash(password , 12);
     const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
     })
     return NextResponse.json({message:`Sign up successfull` , success:true} , {status:200})
    } catch (error) {
        console.log(`Error at sign-up route ${error}`)
         return NextResponse.json({message:`Internal server error` , success:false} , {status:500})
    }

}