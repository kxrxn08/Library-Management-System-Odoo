import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';

const RegistrationForm = () => {


    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleRegistration =async (event) => {
        event.preventDefault();
        console.log(formData);
        axios.post("http://localhost:9999/api/user/adduser", formData,{  headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }}).then((data) => {
            console.log(data);
            localStorage.setItem("access_token",data.data.token);
            navigate("/");
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: ''
            })
        }).catch((err) => {
            console.log(err);
            // setFormData({
            //     firstName: '',
            //     lastName: '',
            //     email: '',
            //     password: '',
            //     confirmPassword: '',
            //     phone: ''
            // })
        })
    };

    const navigateToLogin=()=>{
        navigate("/login");
      }
    

    return (
        <>
            <div class="min-h-screen flex items-center justify-center bg-gray-100">
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg w-full">
                    <form class="w-full" onSubmit={handleRegistration}>
                        <h1 class="text-center text-2xl font-bold mb-8">Register Your Account</h1>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="firstName">
                                    First Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="firstName" onChange={handleChange} type="text" placeholder="" />
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="lastName">
                                    Last Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="lastName" onChange={handleChange} type="text" placeholder="" />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="email">
                                    Email
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" onChange={handleChange} placeholder="example@example.com" />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="password">
                                    Password
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" onChange={handleChange} type="password" placeholder="" />
                                {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="confirmPassword">
                                    Confirm Password
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="confirmPassword" onChange={handleChange} type="password" placeholder="" />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="phone">
                                    Phone Number
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phone" onChange={handleChange} type="text" placeholder="" />
                            </div>
                        </div>
                        <div className='flex gap-4'>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Register
                        </button>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                        onClick={navigateToLogin}
                        >
                            Login
                        </button>
                            </div>

                    </form>
                </div>
            </div>


        </>
    )
}

export default RegistrationForm