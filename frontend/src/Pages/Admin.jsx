import React from 'react'
import Modal from "../Components/Modal";
const Admin = () => {
  return (
    <div className='container m-auto mt-5 '>
        <div className='container ms-3 grid grid-cols-2 ' >
            <form action="" className='col'>
                   <input type="text" name="Search" placeholder='Search books' id="" /> 
            </form>
            <div className='col'>
                <Modal/>
                {/* <button className='bg-green-600 px-3 py-2 rounded-lg' type='button'>Add New Book</button> */}
            </div>
        </div>

    </div>
  )
}

export default Admin