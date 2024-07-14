import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
// import {} from 
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, InputAdornment } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// import jwt_decode from 'jwt-decode';


import axios from 'axios';
const BooksPage = () => {

  const [booksList, setBooksList] = useState([]);
  const [booksSearch, setBooksSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [clickedBookData,setClickedBookData] = useState();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };


  const Modal = () => {
    // console.log(data);
    return (
      <>
        <div
          id="default-modal"  
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-100   max-w-screen-2xl  "
          style={{
            backgroundColor:"#e5e4f1"
          }}
        >
          <div className="relative p-4 w-100  max-w-2xl h-100 max-h-full  bg-black rounded-lg shadow dark:bg-gray-700  overflow-y-auto h-100">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {clickedBookData.title}
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
                {clickedBookData.description}
              </p>
              <div className=" w-full px-2  bg-black rounded-lg shadow-md dark:bg-gray-700">
              </div>
              <div className='flex justify-between'>
              <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Genre : {clickedBookData.genre}
              </span>
              <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Publisher : {clickedBookData.publisher}
              </span>
              </div>
              <div className='flex justify-between'>
              <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Author : {clickedBookData.author}
              </span>
              <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Published On : {clickedBookData.publishedYear}
              </span>
              </div>
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

      </>
    )
  }

  useEffect(()=>{
    // const token = localStorage.getItem("access_token");
    // const data = jwt_decode(token);
    // console.log(data);
  },[])

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:9999/api/books/getbooks');
      console.log(response.data);
      setBooksList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {

    fetchBooks();
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:9999/api/books/searchbar/${booksSearch}`).then((data) => {
      setBooksList(data.data.data);
      console.log(data.data.data);
    }).catch((err) => {
      console.log(err);

    })
    if (booksSearch == '') {
      fetchBooks();
    }
  }, [booksSearch])

  return (
    <>
      <Stack flexGrow={1} direction="column" padding={3} sx={{ width: "80vw", margin: "auto" }} >
        <Box display="flex" justifyContent="center" alignItems="center" sx={{
          paddingY: "15px"
        }}>
          <TextField id="outlined-basic" label="Search Books" variant="outlined"
            onChange={(e) => {
              setBooksSearch(e.target.value);
            }}
            value={booksSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }} />
        </Box>

        <Grid container spacing={5} key={1}>
          {booksList?.map((book, index) => {
            return (
              <Grid item sm={6} key={index}>
                <Card sx={{
                  minHeight: "200px",
                  maxHeight: "200px",
                }} variant='' >
                  <Grid container>
                    <Grid item xs={12} md={4} className='flex items-center justify-center'>
                      <CardContent className='flex items-center justify-center'>
                        <img alt='book image' src={book.imageLinks?.thumbnail} style={{
                          maxHeight: "155px"
                        }} onClick={() => { setIsOpen(true);console.log(book);setClickedBookData(book) }} />
                      </CardContent>
                      {isOpen && <Modal />}
                    </Grid>
                    <Grid item xs={12} md={8} className='md:border-is border-bs md:border-bs-0'>
                      <CardContent>
                        <Typography variant='hs' className='mbe-2 text-ellipsis  overflow-hidden'>
                          {book.title}
                        </Typography>
                        <Typography sx={{
                          paddingTop: "15px"
                        }}>
                          {book?.author} • {book.genre == "" ? "genre" : book?.genre} • {book.publishedYear?.split("-")[0]}
                        </Typography>
                        <Typography className='mbe-2' sx={{
                          fontSize: 14,
                          variant: 'body2',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          paddingTop: "10px"
                        }}>
                          {book.description}
                        </Typography>
                        <button className='px-3 py-2 rounded-lg text-white my-2 align-items-center' style={{
                          backgroundColor:"#704b66"
                        }}>
                          Borrow
                        </button>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )
          })}
        </Grid>

      </Stack>
    </>
  )
}

export default BooksPage