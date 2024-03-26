import connectDB from "@/lib/connect-db";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt')
const appUserModel=require('../../../lib/models/app-user')

export async function POST(request: Request,response:NextApiResponse) {
    try{
      await connectDB();
      try{
        const requestData = await request.json()
        let user = await appUserModel.findOne({ email: requestData.email })
          if (user) {
            throw { error: 'User already exisits. Please sign in', code: 401 };
          }
          const salt = await bcrypt.genSalt(10)
          const password = await bcrypt.hash(requestData?.password, salt)
          const newUser = new appUserModel({
              username: requestData?.userName,
              email: requestData?.email,
              password: password
          })
          const userCreated=await newUser.save()
          if(userCreated?.createdAt){
            return NextResponse.json({data:{name:userCreated?.userName,email:userCreated?.email,status:201}},{status:201})
          }
          else{
            throw { error: 'Something went wrong!', code: 401 };
          }
      }
      catch(err:any){
        return NextResponse.json({data:{error: err.error,status:err.code}},{status:err.code})
      }
    }
    catch(err:any){
      return NextResponse.json({data:{error: 'Connection failed'}},{status:500})
    }
}
