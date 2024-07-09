import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../config/firebase';
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
          
          try {
            const imageUrl = await getDownloadURL(ref(storage, data.imagePath));
            setMovie({ ...data, imageUrl });
          } catch (error) {
            console.error(`Error fetching image for ${data.title}:`, error);
            setMovie({ ...data, imageUrl: '/fallback-image.png' });
          }
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

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img src={movie.imageUrl} alt={movie.title} />
      <p>{movie.description}</p>
      <p>Release Year: {movie.releaseYear}</p>
      <p>Genre: {movie.genre.join(', ')}</p>
      <p>Rating: {movie.rating}</p>
      <p>Duration: {movie.duration}</p>
      <p>Language: {movie.language}</p>
      <p>Country: {movie.country}</p>
    </div>
  );
};

export default MovieCard;
