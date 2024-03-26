"use client";

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ToastContainer, toast } from "react-toastify"
import { useRouter } from "next/navigation";
import { Button, Container, Grid, TextField, Typography } from "@mui/material"
import { IFormInput } from "../../../lib/types"
import 'react-toastify/dist/ReactToastify.css';
import '../auth.css'

const schema = yup
  .object({
    userName: yup.string().required(),
    email:yup.string().email().matches(/^(?!.*@[^,]*,)/).required(),
    password: yup.string()
    .min(8, 'Password should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  })
  .required()


export default function SignUp() {
  const { register, handleSubmit,formState: { errors },reset } = useForm({resolver: yupResolver(schema)})
  const router = useRouter()

  const onSubmit = async (data:IFormInput) => {
    try{
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        const json = await response.json()
        if(json.data.status===201){
          toast.success('done')
      }else{
          toast.error(json.data.error)
      }
    }
    catch(err){
      console.log(err)
    } 
  }
  

    return (  
    <Container className="signup-container">   
    <ToastContainer />   
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <Grid container direction="row" justifyContent="center" alignItems="flex-end">
        <Grid item xs={12} textAlign={'center'}>
          <TextField label="Name" variant="standard" {...register("userName")}/>
          <Typography variant="caption" display="block" className="error-typo">{errors.userName?.message}</Typography>
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          <TextField label="Email" variant="standard" {...register("email")} />
          <Typography variant="caption" display="block" className="error-typo">{errors.email?.message}</Typography>
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          <TextField label="Password" type="password" variant="standard" {...register("password")}/>
          <Typography variant="caption" display="block" className="error-typo">{errors.password?.message}</Typography>
        </Grid>
        <Button type="submit" variant="contained">Register</Button>
    </Grid>
      </form>
  </Container>
    )}