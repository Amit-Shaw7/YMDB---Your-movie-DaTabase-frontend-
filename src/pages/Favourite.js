import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { img_300 } from '../config';
import { Link } from 'react-router-dom';


const Favourite = ({ user }) => {
  const [favMovies, setFavMovies] = useState([]);

  const fetchFavMovie = async () => {
    const url = `http://localhost:5000/api/movies/yourmovies`;

    const res = await fetch(url, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      credentials: "include",
    })
    const json = await res.json();
    setFavMovies(json.movies);
  }

  useEffect(() => {
    fetchFavMovie();
  }, [])
  return (

    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "1rem"
    }} >
      <Stack sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        backgroundColor: "#000000",
        padding: "5px 0px",
        borderRadius: "2rem",
        marginBottom: "1.5rem"
      }}>
        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.7rem", md: "2rem" } }}>Favourites</Typography>
      </Stack>

      <Stack sx={{
        alignItems: "center",
        width: "70%",
        padding: "10px 20px",
        borderRadius: "2rem",
        marginBottom: "1.5rem",
        display: "flex",
        justifyContent: "center",
      }}>
        {
          user ? user.favorites.length === 0 ? <h1 style={{color:"white"}}>No Movies in Favorite</h1>:
            <Stack sx={{ width: "90%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column", height: "auto" }}>
              {
                favMovies && favMovies?.map((movie, idx) => (
                  <Stack key={idx} sx={{color:"white" , alignItems: "center", margin: "10px 0px 50px 0px", width: "100%", display: "flex", justifyContent: "space-between", flexDirection: "row", backgroundColor: "#000000", padding: "15px", borderRadius: "10px", height: "100%" }}>
                    <Stack sx={{ height: "150px", width: "250px" }}>
                      <img style={{ height: "90%", width: "90%", borderRadius: "20px", objectFit: "contain" }} src={`${img_300}/${movie?.imgSm.split('"')[0]}`} alt="" />
                    </Stack>
                    <Typography textAlign="center" sx={{ width: "15%" }}>{movie.title}</Typography>
                    <Typography textAlign="center" sx={{ width: "15%" }}>{movie.rating}</Typography>
                    <Link to={`/${movie.type}/${movie.movieId}`} sx={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", textDecoration: "none" }}>
                      <Button sx={{ backgroundColor: "#277BC0", color: "white", '&:hover': { backgroundColor: "#3B9AE1" } }}>View</Button>
                    </Link>
                  </Stack>
                ))
              }
            </Stack> :
            <h1>Login To avail this feature</h1>
        }
      </Stack>
    </Box>
  )
}

export default Favourite