import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { useAuth } from '../../store/auth'; // Assuming you have access to useAuth for getting the authorization token
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { storage } from '../../config/firebase';
import './UserMovies.css';

const UserMovies = () => {
  const { authorizationToken, userAuthentication } = useAuth(); // Assuming you have access to the authorization token using useAuth
  const [userMovies, setUserMovies] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchMoviesForUser = async () => {
      try {
        const userData = await userAuthentication(authorizationToken); // Fetch user data including user ID
        if (!userData) {
          console.error('User data not available.');
          return;
        }

        const userId = userData._id; // Extract the user ID from the user data
        const response = await fetch(`https://deployment-mern-moviemania.vercel.app/api/movies/${userId}/movies`, {
          headers: {
            Authorization: authorizationToken,
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Fetch image URLs from Firebase Storage
          const moviesWithImageUrls = await Promise.all(data.map(async (movie) => {
            try {
              const imageUrl = await getDownloadURL(ref(storage, movie.imagePath));
              return { ...movie, imageUrl };
            } catch (error) {
              console.error(`Error fetching image for ${movie.title}:`, error);
              return { ...movie, imageUrl: '/fallback-image.png' };
            }
          }));

          setUserMovies(moviesWithImageUrls);
        } else {
          console.error('Error fetching user movies:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user movies:', error);
      }
    };

    fetchMoviesForUser();
  }, [authorizationToken]);

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        setUserMovies(userMovies.filter(movie => movie._id !== movieId));
        console.log('Movie deleted successfully.');
      } else {
        console.error('Error deleting movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleUpdate = (movieId) => {
    // Navigate to the update movie page with the movie ID
    navigate(`/update-movie/${movieId}`);
  };

  return (
    <div className="user-movies-container">
      <h2 className="user-movies-heading">My Movies</h2>
      <div className="user-movies-list">
        {userMovies.map(movie => (
          <div key={movie._id} className="user-movie-item">
            <h3>{movie.title}</h3>
            <img src={movie.imageUrl} alt={movie.title} />
            <div className="movie-buttons">
              <button onClick={() => handleUpdate(movie._id)}>Update</button>
              <button onClick={() => handleDelete(movie._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMovies;

