import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {jwtDecode } from "jwt-decode"
import swal from 'sweetalert';
import './Modal.css'

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [token,setToken]=useState('');
    useEffect(()=>{
    setToken(localStorage.getItem("access_token"));
  },[]);
    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedFromTime, setSelectedFromTime] = useState(null);
    const [selectedToTime,SetSelectedToTime]=useState(null);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [ISBNNumber,setISBNNumber]=useState();
    const [autoFilledData,setAutoFilledData]=useState([]);
  const [formData,setFormData]=useState({
    isbn:0,
    title:"",
    author:"",
    publisher:"",
    publishedYear:"",
    genre:"",
    description:"",
    quantity:"",
    imageLinks:[]
  });
    const handleBooking = () => {

      axios.post("http://localhost:9999/api/books/addbook",formData,{headers:{
        'authorization':token
      }}).then((data)=>{
        console.log(data);
        swal("Hurrah !", "You Added new book successfully 🎉🎉!", "success");
        setFormData({
          isbn:0,
          title:"",
          author:"",
          publisher:"",
          publishedYear:"",
          genre:"",
          description:"",
          quantity:"",
          imageLinks:[],
          available:"",
        });
        toggleModal();
      })
      .catch((err)=>{
        console.log(err);
        swal(err,"warning");
      })
    };
    const SearchByISBN=()=>{
      axios.get("https://www.googleapis.com/books/v1/volumes?q=isbn"+ISBNNumber).then((data)=>{
        console.log(data);
        setAutoFilledData(data.data.items[0])
        const book=data.data.items[0];
        const volumeInfo = book.volumeInfo;
        const industryIdentifiers = volumeInfo.industryIdentifiers;

const result = {
  isbn: industryIdentifiers.find(id => id.type === 'ISBN_13').identifier,
  title: volumeInfo.title,
  author: volumeInfo.authors,
  publisher: volumeInfo.publisher || 'Not available',
  publishedYear: volumeInfo.publishedDate,
  genre: volumeInfo.categories || 'Not available',
  description: volumeInfo.description || 'Not available',
  quantity: 1, // Assuming a default quantity as the response does not provide this info
  available: 1, // Assuming available is the same as quantity
  imageLinks: volumeInfo.imageLinks || ''
};
setFormData(result);
      }).catch((err)=>{
        console.log(err);
      })
    }
    const handleChange = (event) => {
      const { id, value } = event.target;
      setFormData({ ...formData, [id]: value });
  };
  return (
    <div>
<button
        onClick={toggleModal}
        className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        type="button"
      >
        Add New Book +
      </button>

      {isOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-100   max-w-screen-2xl  bg-gray-900 bg-opacity-50 "
        >
          <div className="relative p-4 w-100  max-w-2xl h-full max-h-2xl  bg-black rounded-lg shadow dark:bg-gray-700  overflow-y-auto h-100">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add A new book
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="py-4 md:p-5 space-y-4 w-100">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Acceptance of Terms: By using OurPlatform, you agree to these terms and conditions. We may update them from time to time, and it is your responsibility to review them regularly.
              User Conduct: You agree not to use OurPlatform for any unlawful or prohibited activities. This includes, but is not limited to, harassment, defamation, and transmission of harmful content.
              </p>
                <div className=" w-full px-2  bg-black rounded-lg shadow-md dark:bg-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Book Details</h2>
      <div className="mb-4">
          <h1 className='px-2 font-bold text-white'>You can search book by ISBN_13 Number</h1>
        <div className='flex gap-5 mt-2'>
        <label className="block text-gray-700 dark:text-gray-400 mb-2"  htmlFor='isbn' ><b>ISBN_13 Number </b> </label>
        <input type="number" className='rounded-lg text-black' placeholder=' Add ISBN Number'  name="isbn" id="isbn" onChange={(e)=>{setISBNNumber(e.target.value)}} />
        <button className='px-2 bg-blue-700 text-white rounded-lg' onClick={SearchByISBN} >Search</button>
        </div>
      </div>
      <form action="" className='text-white grid  gap-5 grid-cols-2 px-2' >
        <div className='flex flex-col py-2 '>
          <label htmlFor="isbn">ISBN </label>
          <input type="text" name="isbn" id="isbn" className='rounded-lg py-2 px-2 text-dark' onChange={handleChange} value={formData.isbn} />
        </div>
        <div className='flex flex-col py-2'>
          <label htmlFor="title">Book Name</label>
          <input type="text" name="title" id="title" className='rounded-lg py-2 px-2 text-dark' onChange={handleChange} value={formData.title} />
        </div>
        <div className='flex flex-col py-2'>
          <label htmlFor="genre">Genre</label>
          <input type="text" name="genre" id="genre" className='rounded-lg py-2 px-2 text-dark' onChange={handleChange} value={formData.genre} />
        </div>
        <div className='flex flex-col py-2'>
          <label htmlFor="author">Authors</label>
          <input type="text" name="author" id="author" className='rounded-lg py-2 px-2 text-dark' onChange={handleChange} value={formData.author} />
        </div>
        <div className='flex flex-col py-2'>
          <label htmlFor="publisher">Publisher</label>
          <input type="text" name="publisher" id="publisher " className='rounded-lg py-2 text-dark'onChange={handleChange} value={formData.publisher} />
        </div>
        <div className='flex flex-col py-2'>
          <label htmlFor="publishedYear">Published Year</label>
          <input type="text" name="publishedYear" id="publishedYear " className='rounded-lg py-2 text-dark' onChange={handleChange} value={formData.publishedYear} />
        </div>
        <div className='flex flex-col py-2'>
          <label htmlFor="quantity">Quantity</label>
          <input type="number" name="quantity" id="quantity " className='rounded-lg py-2 text-dark' onChange={handleChange} value={formData.quantity} />
        </div>          
        <div className='flex flex-col py-2'>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" cols="10" rows="5"  className='rounded-lg py-2 text-dark' 
          value={formData.description}
          onChange={handleChange} />
        </div>

      </form>
      <button
        onClick={handleBooking}
        className="w-full bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-lg"
      >
        Add Book
      </button>
      {bookingConfirmed && (
        <div className="mt-4 p-4 bg-green-100 border-t-4 border-green-500 rounded-lg text-green-700">
          Booking confirmed for {selectedDate.toLocaleDateString()} for whole day!
        </div>
      )}
    </div>

              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              We only allow one day of booking in our system.
              </p>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">

              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={toggleModal}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Modal