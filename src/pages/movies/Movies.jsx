import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
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
          console.log('Fetched movies:', data);
          setMovies(data);
          setFilteredMovies(data);
        } else {
          console.error('Failed to fetch movies');
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
    console.log('Search Query:', searchQuery);
    if (searchQuery.trim() !== '') {
      const searchGenres = searchQuery.split(',').map(genre => genre.trim().toLowerCase());
      console.log('Search Genres:', searchGenres);
      const filtered = movies.filter(movie => {
        console.log('Movie Genres:', movie.genre);
        return searchGenres.every(searchGenre =>
          movie.genre.some(movieGenre =>
            movieGenre.toLowerCase().includes(searchGenre)
          )
        );
      });
      console.log('Filtered Movies:', filtered);
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
              src={movie.imagePath} 
              alt={movie.title} 
              onError={(e) => {
                console.error('Error loading image:', e);
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



