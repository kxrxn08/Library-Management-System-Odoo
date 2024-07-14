import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
// import {} from 
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, InputAdornment } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton'

import axios from 'axios';
const BooksPage = () => {

  const [booksList, setBooksList] = useState([1, 2]);

  const [booksSearch, setBooksSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/books/getbooks');
        console.log(response.data);
        setBooksList(response.data.data);
      } catch (err) {
      }
    };

    fetchBooks();
  }, [])

  useEffect(() => {

  }, [booksSearch])

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  return (
    <>
      <Stack flexGrow={1} direction="column" padding={3}>
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
        <Grid container spacing={5}>
          {booksList?.map((book, index) => {
            return (
              <Grid item sm={6} key={index}>
                <Card sx={{
                  minHeight:"200px",
                  maxHeight:"200px",
                }}>
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
                        <Typography variant='h5' className='mbe-2'>
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
                      <CardActions className='justify-between card-actions-dense'>
                        <Button startIcon={<i className='ri-shopping-cart-2-line' />}>Add to Cart</Button>
                      </CardActions>
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