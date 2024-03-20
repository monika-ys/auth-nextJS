import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { IFormInput } from "../types"
import { Button, Container, Grid, TextField, Typography } from "@mui/material"
import '../auth.css'

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email:yup.string().email().matches(/^(?!.*@[^,]*,)/).required(),
    password: yup.string()
    .min(8, 'Password should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  })
  .required()


export default function SignUp() {
  const { register, handleSubmit,formState: { errors }, } = useForm({resolver: yupResolver(schema),})
  const onSubmit = (data:IFormInput) => console.log(data)

    return (  
    <Container className="signup-container">      
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <Grid container direction="row" justifyContent="center" alignItems="flex-end">
        <Grid item xs={12} textAlign={'center'}>
          <TextField label="First Name" variant="standard" {...register("firstName")}/>
          <Typography variant="caption" display="block" className="error-typo">{errors.firstName?.message}</Typography>
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          <TextField label="Last Name" variant="standard" {...register("lastName")}/>
          <Typography variant="caption" display="block" className="error-typo">{errors.lastName?.message}</Typography>
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