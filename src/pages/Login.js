import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ user, setUser }) => {
  const email = useRef();
  const password = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/auths/login`;
    const newUser = {
      email: email.current.value,
      password: password.current.value,
    }
    const res = await fetch(url, {
      method: 'POST', // or 'PUT'
      credentials: "include",
      body: JSON.stringify(newUser),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    if (res.status === 200) {
      localStorage.setItem("token", json.token);
      setUser(json.user);
    } else {
      alert(json.msg);
    }

  }
  return (
    <Box sx={{ height: "80vh", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center", width: "80vw", margin: "auto" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80%", width: "100%" }}>
        <Stack sx={{ border: "1px solid #004e9c", color:"white" , display: "flex", alignItems: "center", borderRadius: "10px", justifyContent: "space-around", backgroundColor: "#000000", height: "80%", width: { xs: "100%", sm: "80%", md: "50%" }, flexDirection: "column" }}>
          <Typography letterSpacing="3px" fontSize="2rem">LOGIN</Typography>
          <input autoComplete='true' ref={email} style={{ padding: "10px 10px", width: "80%", borderRadius: "10px", outline: "none", backgroundColor: "transparent", border: "1px solid #004e9c", color: "white" }} type="email" placeholder="Email" />
          <input autoComplete='true' ref={password} style={{ padding: "10px 10px", width: "80%", borderRadius: "10px", outline: "none", backgroundColor: "transparent", border: "1px solid #004e9c", color: "white" }} type="password" placeholder="Password" />

          <Stack sx={{ height: "30%", marginTop: "30px", width: "100%", flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <Button type='submit' sx={{ backgroundColor: "#004e9c", width: "80%", color: "white", '&:hover': { backgroundColor: "white" , color:"black" } }}>LOGIN</Button>
            <Typography letterSpacing="3px" fontSize="1rem">OR</Typography>

            <Link style={{ width: "100%", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }} to="/signup">
              <Button sx={{ backgroundColor: "#004e9c", width: "50%", color: "white", '&:hover': { backgroundColor: "white" , color:"black" } }}>SIGNUP</Button>
            </Link>
          </Stack>
        </Stack>
      </form>
    </Box>
  )
}

export default Login