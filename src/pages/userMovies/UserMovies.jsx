import React, { useState, useEffect } from 'react';
import './UserMovies.css';
import { useAuth } from '../../store/auth'; // Assuming you have access to useAuth for getting the authorization token
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../config/firebase';
; // Ensure you have configured Firebase in this file

const UserMovies = () => {
  const { authorizationToken, userAuthentication } = useAuth();
  const [userMovies, setUserMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoviesForUser = async () => {
      try {
        const userData = await userAuthentication(authorizationToken);
        if (!userData) {
          console.error('User data not available.');
          return;
        }

        const userId = userData._id;
        const response = await fetch(`https://deployment-mern-moviemania.vercel.app/api/movies/${userId}/movies`, {
          headers: {
            Authorization: authorizationToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          
          const moviesWithUrls = await Promise.all(
            data.map(async (movie) => {
              const url = await getDownloadURL(ref(storage, movie.imagePath));
              return { ...movie, imageUrl: url };
            })
          );
          
          setUserMovies(moviesWithUrls);
        } else {
          console.error('Error fetching user movies:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user movies:', error);
      }
    };

    fetchMoviesForUser();
  }, [authorizationToken, userAuthentication]);

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(`https://deployment-mern-moviemania.vercel.app/api/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        setUserMovies((prevMovies) => prevMovies.filter(movie => movie._id !== movieId));
        console.log('Movie deleted successfully.');
      } else {
        console.error('Error deleting movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleUpdate = (movieId) => {
    navigate(`/update-movie/${movieId}`);
  };

  return (
    <div className="user-movies-container">
      <h2 className="user-movies-heading">My Movies</h2>
      <div className="user-movies-list">
        {userMovies.length > 0 ? (
          userMovies.map(movie => (
            <div key={movie._id} className="user-movie-item">
              <h3>{movie.title}</h3>
              <img 
                src={movie.imageUrl} 
                alt={movie.title} 
                onError={(e) => {
                  console.error('Error loading image:', e);
                  e.target.src = '/fallback-image.png';
                }} 
              />
              <div className="movie-buttons">
                <button onClick={() => handleUpdate(movie._id)}>Update</button>
                <button onClick={() => handleDelete(movie._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default UserMovies;
