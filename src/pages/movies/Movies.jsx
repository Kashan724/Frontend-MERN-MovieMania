import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import './Movies.css'; // Uncomment this line to import the CSS file

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]); // State to hold filtered movies
  const { authorizationToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/movies', {
          method: "GET"
        });

        if (response.ok) {
          const data = await response.json();
          setMovies(data);
          setFilteredMovies(data); // Initialize filteredMovies with all movies
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
      // Split the search query by commas to get an array of genres
      const searchGenres = searchQuery.split(',').map(genre => genre.trim().toLowerCase());
      console.log('Search Genres:', searchGenres);
      const filtered = movies.filter(movie => {
        console.log('Movie Genres:', movie.genre);
        // Check if any genre in the movie matches any of the search genres
        return searchGenres.every(searchGenre =>
          movie.genre.some(movieGenre =>
            movieGenre.toLowerCase().includes(searchGenre)
          )
        );
      });
      console.log('Filtered Movies:', filtered);
      setFilteredMovies(filtered); // Update filteredMovies state with filtered results
    } else {
      setFilteredMovies(movies); // If search query is empty, show all movies
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
            <img src={`http://localhost:4000${movie.imagePath}`} alt={movie.title} />
            <div className="title">{movie.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;



