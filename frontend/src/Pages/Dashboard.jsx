import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {jwtDecode } from "jwt-decode"
  
const Dashboard = () => {

  const [history,setHistory]=useState([]);

  useEffect(()=>{
    var token = localStorage.getItem("access_token");
      var decoded = jwtDecode(token);
      console.log(decoded); 
    axios.get("http://localhost:9999/api/borrow/getborrowbook").then((data)=>{
      console.log(data);
      data.data.data?.map((e)=>{
        if(e.user_id===decoded.id);
        setHistory([...history,e.book_id]);

      })
      // navigate("/dashboard");
  }).catch((err)=>{
    console.log(err);
  })
  },[]);

  return (
    <div className="h-full">
 <div className="app h-full">
      <div className="app-body flex">
        <div className="app-body-navigation h-screen w-64 bg-gray-800 text-white p-4">
          <nav className="navigation flex flex-col space-y-4">
            <a href="#" className="flex items-center space-x-2">
              <i className="ph-browsers"></i>
              <span>Dashboard</span>
            </a>
            <a href="/" className="flex items-center space-x-2">
              <i className="ph-check-square"></i>
              <span>Home</span>
            </a>
          </nav>
          <footer className="footer mt-auto pt-4">
            <div>
            @Odoo-Library
            </div>
          </footer>
        </div>
        <div className="app-body-main-content flex-1 p-8">
          <section className="service-section mb-8">
            <h2 className="text-2xl font-bold mb-4">History</h2>
            {/* <div className="service-section-header flex items-center mb-4">
              <div className="search-field flex items-center border border-gray-300 rounded p-2 mr-4">
                <i className="ph-magnifying-glass mr-2"></i>
                <input type="text" placeholder="Account number" className="outline-none" />
              </div>
              <div className="dropdown-field relative mr-4">
                <select className="border border-gray-300 rounded p-2 bg-white appearance-none">
                  <option>Home</option>
                  <option>Work</option>
                </select>
                <i className="ph-caret-down absolute right-2 top-1/2 transform -translate-y-1/2"></i>
              </div>
              <button className="flat-button bg-blue-600 text-white py-2 px-4 rounded">Search</button>
            </div> */}
            <div className="mobile-only lg:hidden mb-4">
              <button className="flat-button bg-blue-600 text-white py-2 px-4 rounded">Toggle search</button>
            </div>
            {/* <div className="tiles grid grid-cols-1 lg:grid-cols-3 gap-4">
              <article className="tile bg-white p-4 rounded shadow">
                <div className="tile-header flex items-center mb-4">
                  <i className="ph-lightning-light text-yellow-500 mr-2"></i>
                  <h3>
                    <span className="block text-lg font-bold">Dedicated Seating</span>
                    <span className="block text-gray-500">Technman Consulting</span>
                  </h3>
                </div>
                <a href="#" className="flex items-center text-blue-600 hover:underline">
                  <span>Go to service</span>
                  <span className="icon-button ml-2">
                    <i className="ph-caret-right-bold"></i>
                  </span>
                </a>
              </article>
            </div> */}
            {/* <div className="service-section-footer mt-4">
              <p className="text-gray-500">Services are paid according to the current state of the currency and tariff.</p>
            </div> */}
          </section>
          <section className="transfer-section">
            <div className="transfer-section-header flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Latest transfers</h2>
              <div className="filter-options  items-center">  

              </div>
            </div>
            <div className="transfers space-y-4">
              <div className="transfer items-center bg-white p-4 rounded shadow">
                          <div className="">
                {
                  history?.map((e)=>{
                    
                    return (
                      <>{e?.map((index,e2)=>{
                        return (
                          <>
                          {console.log("------",e2)}
              <div className="text-lg font-bold" key={index} >{e2.title}</div >
                            </>
                        )
                      })}
</>)
                  })
                }

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Dashboard