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
const BooksPage = () => {

  const [booksList, setBooksList] = useState([1,2]);

  const [booksSearch, setBooksSearch] = useState("");

  useEffect(() => {

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
          paddingY:"15px"
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
          {booksList.map((book) => {
            return (
              <Grid item md={4} sm={6}>
                <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
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