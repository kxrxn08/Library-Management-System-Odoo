import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import swal from 'sweetalert';
import {jwtDecode } from "jwt-decode"
const Checkout = () => {
  
  const location=useLocation();
  const navigate=useNavigate();
  const data=location.state.data || [];
  const [formData,setFormData]=useState({});

  const [userId,setUserId]=useState();
  const [bookId,setBookId]=useState([]);
    useEffect(()=>{
      var token = localStorage.getItem("access_token");
      var decoded = jwtDecode(token);
      console.log(decoded);
      setUserId(decoded.id);
      var a=[];
      data?.map((e)=>{
        console.log(e);
        a.push(e._id);
        setBookId([...bookId,e._id])
      })
      console.log(a,decoded);
      setFormData({
        "user_id":decoded.id,
        "book_id":a
        })
    },[]);

  const BorrowBook=()=>{
    
    console.log(formData);
    axios.post("http://localhost:9999/api/borrow/borrowbook",formData).then((data)=>{
      swal("Hurrah !", "You Borrowed new book successfully 🎉🎉!", "success");
        console.log(data);
        navigate("/dashboard");
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className='container mx-auto  '>
              <h1 className='text-center mb-2 my-2 font-bold text-2xl'>
                Your Cart 
              </h1>
            <div className=" w-50  mx-auto  border-black rounded-lg  border-4">  
              {console.log(data)}
              <div className='mx-5 py-3'>
            {
              data?.map((e)=>{
                return <div className='grid grid-cols-2 gap-3 py-3'>
                    <div className='px-4'>
                      <img src={e.imageLinks?.smallThumbnail} alt="bookImage" className='' />
                    </div>
                    <div className=' px-3' >
                      <h1 className='font-bold font-serif'>
                        {e?.title}
                      </h1>
                      <div>
                        {e?.author} 
                      </div>
                      <div className='text-clip text-wrap whitespace-nowrap' >
                        {e?.genre}
                      </div>
                    </div>
                  </div>
              })
            }
                  </div>
            <button className=' w-100 items-center pb-2 bg-green-500 text-white font-bold font-serif ' onClick={BorrowBook} >
              Continue
            </button>
            </div>
    </div>
  )
}

export default Checkout