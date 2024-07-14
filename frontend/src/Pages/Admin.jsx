import React, { useEffect, useState } from 'react'
import Modal from "../Components/Modal";
import axios from 'axios';
const Admin = () => {
    const [books,setBooks]=useState([]);

    useEffect(()=>{

        axios.get("http://localhost:9999/api/books/getbooks").then((data)=>{
            console.log(data.data.data);
            setBooks(data.data.data);
        }).catch((error)=>{
            console.log(error);
        })

    },[]);
  return (
    <div className='container m-auto mt-5 '>
        <div className='container ms-3 grid grid-cols-2 ' >
            <form action="" className='col'>
                   <input type="text" name="Search" placeholder='Search books' id="" /> 
            </form>
            <div className='col'>
                <Modal/>
            </div>
        </div>
        {/* <div className="container">
            {
                books.map((e,index)=>{});
            }
        </div> */}

    </div>
  )
}

export default Admin