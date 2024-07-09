import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { useAuth } from '../../store/auth';
import { auth, storage } from '../../config/firebase';
import './UserMovies.css';

const UserMovies = () => {
  const [movies, setMovies] = useState([]);
  const { authorizationToken } = useAuth();

  useEffect(() => {
    const fetchUserMovies = async () => {
      try {
        const response = await fetch('https://deployment-mern-moviemania.vercel.app/api/user/movies', {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${authorizationToken}`,
          }
        });

        if (response.ok) {
          const data = await response.json();
          const user = auth.currentUser;

          if (user) {
            const userId = user.uid;
            const moviesWithImageUrls = await Promise.all(data.map(async (movie) => {
              try {
                const imageUrl = await getDownloadURL(ref(storage, `${userId}/${movie.imagePath}`));
                return { ...movie, imageUrl };
              } catch (error) {
                console.error('Error fetching image URL:', error);
                return { ...movie, imageUrl: '/fallback-image.png' };
              }
            }));

            setMovies(moviesWithImageUrls);
          } else {
            console.error('User not authenticated');
          }
        } else {
          const errorText = await response.text();
          console.error('Failed to fetch user movies:', response.status, errorText);
        }
      } catch (error) {
        console.error('Error fetching user movies:', error);
      }
    };

    fetchUserMovies();
  }, [authorizationToken]);

  return (
    <div className="user-movies-container">
      {movies.map((movie) => (
        <div key={movie._id} className="movie-card">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            onError={(e) => {
              e.target.src = '/fallback-image.png';
            }}
          />
          <div className="title">{movie.title}</div>
        </div>
      ))}
    </div>
  );
};

export default UserMovies;
