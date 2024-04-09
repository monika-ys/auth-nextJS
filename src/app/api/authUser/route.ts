import connectDB from "@/lib/connect-db";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
const appUserModel=require('../../../lib/models/app-user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


export async function POST(request:Request,response:NextApiResponse) {
    try{
        await connectDB()
        try {
            const data = await request.json();
            const user= await appUserModel.findOne({email: data.email });
            if (!user) {
                throw { error: "User Email not exist", code: 401 };
            }
            const passwordMatch = await bcrypt.compare(data.password, user.password);
            if (!passwordMatch) {
                throw { error: "Authentication failed", code: 401 };
            }
            const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
                expiresIn: '1h',
            });
                return NextResponse.json({data:{email:user.email,name:user.username,token:token,status:200}},{status:200})
            } 
            catch (err:any) {
                return NextResponse.json({data:{error: err.error,status:err.code}},{status:err.code})
            }           
    }
    catch(err){
        return NextResponse.json({data:{error: 'Connection failed'}},{status:500})
    }
}