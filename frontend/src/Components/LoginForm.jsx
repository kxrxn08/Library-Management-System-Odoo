import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error,setError]=useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const changeURL=()=>{
        navigate("/register");
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:9999/api/user/getuser", formData,{  headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }}).then((data) => {
            console.log(data);
            localStorage.setItem("access_token",data.data.userToken);
            setError(null);

            navigate("/");
            // window.location.reload();
          }).catch((err)=>{
            console.log(err);
            setError(err?.response?.data?.message);
          })
    }
    const Alert=()=>{
        return (<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2" role="alert">
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline ps-2">{error}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>)
    }
    return (
        <>
            <div class="min-h-screen flex items-center justify-center "
            style={{
                backgroundColor:"#e5e4f1"
            }}>
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg w-full">
                    {
                        error && <Alert/>
                    }
                    <form class="w-full">
                        <h1 class="text-center text-2xl font-bold mb-8" style={{color:"#704b66"}}>Login to Your Account</h1>  {/* Updated title */}
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="email" style={{color:"#704b66"}}>
                                    Email
                                </label>
                                <input
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="email"
                                    type="email"
                                    placeholder="example@example.com"
                                    onChange={handleChange}
                                    name="email"
                                />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="password" style={{color:"#704b66"}}>
                                    Password
                                </label>
                                <input
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="password"
                                    type="password"
                                    placeholder=""
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='flex gap-4 '>
                        <button class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" 
                        onClick={handleSubmit}
                        style={{
                            backgroundColor:"#704b66"
                        }}
                        >
                            Login
                        </button>
                        {/* <button  class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                        onClick={changeURL}
                        style={{
                            backgroundColor:"#704b66"
                        }}>
                            SignUp
                        </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default LoginForm