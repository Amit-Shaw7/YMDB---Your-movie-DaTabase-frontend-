import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Signup = ({ setUser }) => {
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const phone = useRef();
  const cPassword = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/auths/register`;
    const newUser = {
      email: email.current.value,
      password: password.current.value,
      phone: phone.current.value,
      name: name.current.value
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
    <Box sx={{ height: "80vh", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>

      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%" }}>
        <Stack sx={{color:"white" , border: "1px solid #004e9c", display: "flex", alignItems: "center", borderRadius: "10px", justifyContent: "space-around", backgroundColor: "#000000", height: "90%", width: { xs: "100%", sm: "80%", md: "50%" }, flexDirection: "column" }}>
          <Typography letterSpacing="3px" fontSize="2rem">SIGNUP</Typography>
          <input autoComplete='true' ref={name} style={{ padding: "10px 10px", width: "80%", borderRadius: "10px", outline: "none", backgroundColor: "transparent", border: "1px solid #004e9c", color: "white" }} type="text" placeholder="Name" />
          <input autoComplete='true' ref={email} style={{ padding: "10px 10px", width: "80%", borderRadius: "10px", outline: "none", backgroundColor: "transparent", border: "1px solid #004e9c", color: "white" }} type="email" placeholder="Email" />
          <input autoComplete='true' ref={phone} style={{ padding: "10px 10px", width: "80%", borderRadius: "10px", outline: "none", backgroundColor: "transparent", border: "1px solid #004e9c", color: "white" }} type="password" placeholder="Phone" />
          <input autoComplete='true' ref={password} style={{ padding: "10px 10px", width: "80%", borderRadius: "10px", outline: "none", backgroundColor: "transparent", border: "1px solid #004e9c", color: "white" }} type="password" placeholder="Password" />
          <input autoComplete='true' ref={cPassword} style={{ padding: "10px 10px", width: "80%", borderRadius: "10px", outline: "none", backgroundColor: "transparent", border: "1px solid #004e9c", color: "white" }} type="password" placeholder="Confirm Password" />

          <Stack sx={{ height: "30%", marginTop: "30px", width: "100%", flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <Button type='submit' sx={{ backgroundColor: "#004e9c", width: "80%", color: "black", '&:hover': { backgroundColor: "white" , color:"black" } }}>SIGNUP</Button>
            <Typography letterSpacing="3px" fontSize="1rem">OR</Typography>

            <Link style={{ width: "100%", textDecoration: "none", color: "black", display: "flex", alignItems: "center", justifyContent: "center" }} to="/login">
              <Button sx={{ backgroundColor: "#004e9c", width: "50%", color: "black", '&:hover': { backgroundColor: "white", color:"black" } }}>LOGIN</Button>
            </Link>
          </Stack>
        </Stack>
      </form>
    </Box>
  )
}

export default Signup