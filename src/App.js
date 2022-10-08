import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ContentModal from "./components/ContentModal";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import Favourite from "./pages/Favourite";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Trending from "./pages/Trending";
import TvSeries from "./pages/TvSeries";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoggedIn = async () => {
      const url = `http://localhost:5000/api/auths/getUser`;
      const res = await fetch(url, {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: "include",
      });
      const json = await res.json();
      // console.log(json)
      setUser(json.user)
    }
    if (token) {
      isLoggedIn();
    }
  }, [])
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Trending />} />
        <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/tvseries" element={<TvSeries />} />
        <Route exact path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Login user={user} setUser={setUser} />} />
        <Route exact path="/favorites" element={<Favourite user={user} />} />
        <Route exact path="/:media/:id" element={<ContentModal user={user} setUser={setUser} />} />
        <Route exact path="/signup" element={user ? <Profile user={user} setUser={setUser} /> : <Signup user={user} setUser={setUser} />} />
        <Route exact path="/search" element={<Search />} />
      </Routes>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
