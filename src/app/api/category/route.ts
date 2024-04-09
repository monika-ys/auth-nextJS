import connectDB from "@/lib/connect-db";
import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken');
const Categories=require('../../../lib/models/product-category')

export async function GET(req:Request){
    try{
        await connectDB()
        // verify token
        var token = req.headers.get('token')
        console.log('token',token)
        // var token = req.headers['x-access-token'];
        if (!token) return NextResponse.json({data:{auth: false, error: 'No token provided.'}},{status:401});
        
        jwt.verify(token,'RSH247', function(err, decoded) {
          if (err) return NextResponse.json({data:{ auth: false, message: 'Failed to authenticate token.'}},{status:401});
          console.log('decoded',decoded)
        //   res.status(200).send(decoded);
        });
        // get category
        const categoriesData = await Categories.find({})
        if(categoriesData){
            const categories=categoriesData?.map((data)=>{
                return {
                    name:data?.categoryName,
                    id:data?.categoryId
                }
            })
            
            return NextResponse.json({data:{categories:categories,status:200}},{status:200})
        }
        else{
            throw { error: 'Something went wrong!', code: 401 };
        }
    }
    catch(err){
        return NextResponse.json({data:{error: 'Connection failed'}},{status:500})
    }
}

export async function POST(request:Request,response:NextResponse){
    try{
        await connectDB()
        try{
            const bodyData=await request.json()
            console.log('bodyData',bodyData)
            const iscategoryExist=await Categories?.findOne({categoryName:bodyData.categoryName})
            if(iscategoryExist){
                throw {error:'Category alredy exist',code: 401}
            }
            const categoryData=new Categories({
                categoryId: Math.floor(1000 + Math.random() * 9000),
                categoryName:bodyData.categoryName
            })
            const addCategory=await categoryData.save()
            console.log('addCategory',addCategory)
            if(addCategory?.categoryId){
                return NextResponse.json({data:{name:addCategory.name,status:201}},{status:201})
            }
            else{
                throw { error: 'Something went wrong!', code: 401 };
            }

        }catch(err:any){
            return NextResponse.json({data:{error: err.error,status:err.code}},{status:err.code})
        }
    }
    catch(err){
        return NextResponse.json({data:{error: 'Connection failed'}},{status:500})
    }
}