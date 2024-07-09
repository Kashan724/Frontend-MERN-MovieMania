import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { useAuth } from '../../store/auth';
import { storage, auth } from '../../config/firebase';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { authorizationToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://deployment-mern-moviemania.vercel.app/api/movies', {
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
            setFilteredMovies(moviesWithImageUrls);
          } else {
            console.error('User not authenticated');
          }
        } else {
          const errorText = await response.text();
          console.error('Failed to fetch movies:', response.status, errorText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMovies();
  }, [authorizationToken]);

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.trim() !== '') {
      const searchGenres = searchQuery.split(',').map(genre => genre.trim().toLowerCase());
      const filtered = movies.filter(movie => 
        searchGenres.every(searchGenre =>
          movie.genre.some(movieGenre =>
            movieGenre.toLowerCase().includes(searchGenre)
          )
        )
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  };

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by genre (comma-separated)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearchButtonClick} className="search-button">Search</button>
      </div>
      <div className="movie-gallery">
        {filteredMovies.map((movie) => (
          <div key={movie._id} className="movie-card" onClick={() => handleMovieClick(movie._id)}>
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
    </div>
  );
};

export default Movies;
