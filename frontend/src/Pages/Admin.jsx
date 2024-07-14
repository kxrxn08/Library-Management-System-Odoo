import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, InputAdornment } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from "../Components/Modal";
import axios from 'axios';
const Admin = () => {
    const [books,setBooks]=useState([]);
    const [booksList, setBooksList] = useState([]);

    useEffect(()=>{

        axios.get("http://localhost:9999/api/books/getbooks").then((data)=>{
            console.log(data.data.data);
            setBooksList(data.data.data);
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

        <Stack flexGrow={1} direction="column" padding={3} sx={{width:"80vw",margin:"auto"}} >
        
        <Grid container spacing={5} key={1} className='pb-5'>
          {booksList?.map((book, index) => {
            return (
              <Grid item sm={6} key={index}>
                <Card sx={{
                  minHeight:"200px",
                  maxHeight:"200px",
                }} variant='' >
                  <Grid container>
                    <Grid item xs={12} md={4} className='flex items-center justify-center'>
                      <CardContent className='flex items-center justify-center'>
                        <img alt='book image' src={book.imageLinks?.thumbnail} style={{
                          maxHeight:"155px"
                        }} />
                      </CardContent>
                    </Grid>
                    <Grid item xs={12} md={8} className='md:border-is border-bs md:border-bs-0'>
                      <CardContent>
                        <Typography variant='hs' className='mbe-2 text-ellipsis  overflow-hidden'>
                          {book.title}
                        </Typography>
                        <Typography sx={{
                          paddingTop:"15px"
                        }}>
                          {book?.author} - {book.genre == "" ? "genre": book?.genre} 
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
                        
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )
          })}
        </Grid>

      </Stack>

        {/* <div className="container">
            {
                books.map((e,index)=>{});
            }
        </div> */}

    </div>
  )
}

export default Admin