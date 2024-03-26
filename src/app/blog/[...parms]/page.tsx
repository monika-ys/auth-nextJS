"use client"
export default function Blog({ params }: { params: { parms: string[] } }){
    return(
    <>
        <h1>Blog Page</h1>
        {params?.parms?.map((data:string)=>{
            return <p>{data}</p>
        })}
    </>
)}