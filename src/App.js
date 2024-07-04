import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
//import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Movies from './pages/movies/Movies';
//import './App.css';
import MovieForm from './pages/movieform/MovieForm';
import MovieCard from './pages/moviecard/MovieCard';
import UserMovies from './pages/userMovies/UserMovies';
import UpdateMovie from './pages/UpdateMovie/UpdateMovie';
import ResetPassword from './pages/reset-password/ResetPassword';
import Layout from './components/layout/Layout';


function App() {
  
  return (
    <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies-form" element={<MovieForm />} />
        <Route path="/movies/:id" element={<MovieCard />} /> {/* Add this route */}
        <Route path="my-movies" element={<UserMovies />} /> {/* Add this route */}
        <Route path="/update-movie/:id" element={<UpdateMovie />} /> {/* Add this route */}
        <Route path="/reset-password" element={<ResetPassword />} />   
      </Routes>
      </Layout>
  </Router>
  );
}

export default App;


