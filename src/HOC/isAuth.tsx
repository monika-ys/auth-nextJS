
"use client"
import { useEffect } from "react";
import { redirect } from "next/navigation";

const isAuth=(Component: any)=>{
    return function IsAuth(props: any) {
        const data=localStorage.getItem('userdetails')
        const userDeatils=data && JSON.parse(data)
        useEffect(()=>{
            if(!userDeatils?.token){
                return redirect("/auth/signIn");
            }
        },[])

        if (!userDeatils?.token) {
            return null;
        } 
        return (<Component {...props} />)
    }
}

export default isAuth