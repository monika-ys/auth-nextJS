"use client";

import { Card, CardContent,Grid, CardHeader, Container, TextField, Button } from '@mui/material'
import {useForm} from 'react-hook-form'
import { useRouter} from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import { UseFormInputs } from '@/lib/types';
import 'react-toastify/dist/ReactToastify.css';
import '../auth.css'

const SignIn=() =>{
    const {register,handleSubmit,reset,formState: { errors },} = useForm<UseFormInputs>()
    const router = useRouter()
    
      const onSubmit = async(data: UseFormInputs) => {
            const resp=await fetch('/api/authUser',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify(data)
            })
            const respData=await resp?.json()
            if(respData.data.status===200){
                localStorage.setItem('userdetails',JSON.stringify(respData?.data))
                toast.success('done')
            }else{
                toast.error(respData.data.error)
            }
      }
    return (
        <Container maxWidth="lg">
        <ToastContainer position="top-right"/>
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            height= '100vh'
            margin={0}
            sx={{
                background:'#ececec',
            }}
        >
        <Card sx={{ maxWidth: 475 }}>
            <CardHeader className='signin-header' title="SignIn User"/>
            <CardContent>
            <form className='signin-form' onSubmit={handleSubmit(onSubmit)}>
                <TextField label="Email" variant="standard"  {...register("email", { required: true })}/>
                <TextField label="Password" type="password" variant="standard"{...register("password",{ required: true })}/>
                <Button type="submit" variant="contained">SignIn</Button>
                <Button variant='outlined' onClick={()=>router.push('/auth/signUp')}>signUp</Button>
            </form>
            </CardContent>
        </Card>
        </Grid>
      </Container>
    )
}

export default SignIn