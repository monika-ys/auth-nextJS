"use client"
import isAuth from "@/HOC/isAuth"

const Dashboard=()=>{
    return(<>
    <h1>Dash</h1>
    </>)
}

export default isAuth(Dashboard)