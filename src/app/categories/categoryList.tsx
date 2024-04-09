"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Box, Button, TextField } from "@mui/material"
import image from '../images/logo.jpeg'
import './category.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

interface IProp{
  data:{
    name:string,
    id:string
  }[],
  addCategory:(category:string)=>{success:boolean,msg:string}
}

export const CategoryList=({data,addCategory}:IProp)=>{
  const [category,setcategory]=useState('')
  const [range,setRange]=useState('0')
  const newCategory=async()=>{
    const resp=await addCategory(category)
    resp.success? toast.success(resp.msg) : toast.error(resp.msg)
    setcategory('')
  }
  return (
    <>
    <ToastContainer /> 
    <Box
      p={2}
      sx={{
          maxWidth: 800,
          height:200,
          borderRadius: 1,
          bgcolor: '#e8eaf6',
          display:'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
    >
      <Image src={image} alt='image' width={150} height={40} style={{paddingBottom:'15px'}}/>
      <TextField id="outlined-basic" label="Category Name" variant="outlined" value={category} onChange={(e)=>setcategory(e.target.value)}/>
      <Button className="category-button" onClick={newCategory}>Create Category</Button>
    </Box>
    <input type="range" min="1" max="100" value={range} onChange={(e)=>{setRange(e.target.value)}} />
    <p>{range}</p>
    {/* <Box>
    <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        subheader={<ListSubheader>Categories</ListSubheader>}
    >
      {data.map((data:{name:string,id:string})=>{
        return (<ListItem>{data?.name}</ListItem>)
      })}
    </List>
    </Box> */}
  </>
  )
}
