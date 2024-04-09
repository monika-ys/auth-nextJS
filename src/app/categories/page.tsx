"use server";

import { Container} from "@mui/material"
import './category.css'
import { CategoryList } from './categoryList'
import { useEffect } from "react";

async function getCategory (){
  const res = await fetch('http://localhost:3000/api/category', { 
    method:'GET',
    headers: {
      token:JSON.parse(getUserfromLocalStorage).token
    },
    cache: 'force-cache' 
  })
  const repo = await res.json()
  return repo.data
}

const Category=async()=>{
    
    const data= await getCategory()
    
    async function postCategory (newCategory:string){
      "use server";
        const resp=await fetch('http://localhost:3000/api/category',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                token:JSON.parse(getUserfromLocalStorage).token
              },
              body: JSON.stringify({
                categoryName:newCategory
              })
        })
        const json = await resp.json()
        if(json.data.status===201){
          return {success:true,msg:'category added'}
        }else{
          return {success:false, msg:json.data.error}
      }
    }

    return(
        <Container maxWidth={false} disableGutters className="category-container">
          <CategoryList data={data?.categories} addCategory={postCategory}/>  
        </Container>
        
    )
}

export default Category