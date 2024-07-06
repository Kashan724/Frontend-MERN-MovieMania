import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://deployment-mern-moviemania.vercel.app/api/movies/${id}`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched movie:', data); // Debugging
          setMovie(data);
        } else {
          console.error('Failed to fetch movie');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const imageUrl = `https://deployment-mern-moviemania.vercel.app/upload/${movie.imagePath}`;
  const titleLetters = movie.title.split('');

  return (
    <div className="movie-details">
      <h1>
  {movie.title.split(' ').map((word, wordIndex) => (
    <React.Fragment key={wordIndex}>
      {word.split('').map((letter, letterIndex) => (
        <span
          key={`${wordIndex}-${letterIndex}`}
          className="title-letter"
          style={{ animationDelay: `${(wordIndex * 0.1) + (letterIndex * 0.1)}s` }}
        >
          {letter}
        </span>
      ))}
      {' '} {/* Add a space between words */}
    </React.Fragment>
  ))}
</h1>
      <img src={imageUrl} alt={movie.title} />
      <p>{movie.description}</p>
      <p>Release Year: <span>{movie.releaseYear}</span></p>
      <p>Genre: <span>{movie.genre.join(', ')}</span></p>
      <p>Rating: <span>{movie.rating}</span></p>
      <p>Duration: <span>{movie.duration}</span></p>
      <p>Language: <span>{movie.language}</span></p>
      <p>Country: <span>{movie.country}</span></p>
    </div>
  );
};

export default MovieCard;
