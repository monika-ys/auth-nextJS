"use client";
import { useState } from "react";
import SignUp from "./signUp/page";
import SignIn from "./signIn/page";

function Auth() {
    const [isAuth,setIsAuth]=useState(false)
    return(
        isAuth ? <SignIn/> : <SignUp />
    )
}

export default Auth