import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { auth, storage } from '../../config/firebase';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const [imageUrl, setImageUrl] = React.useState('');

  React.useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const imageRef = ref(storage, `${userId}/${movie.imagePath}`);
          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
        } else {
          console.error('User not authenticated');
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
        setImageUrl('/fallback-image.png');
      }
    };

    fetchImageUrl();
  }, [movie.imagePath]);

  return (
    <div className="movie-card" onClick={() => handleMovieClick(movie._id)}>
      <img
        src={imageUrl}
        alt={movie.title}
        onError={(e) => {
          e.target.src = '/fallback-image.png';
        }}
      />
      <div className="title">{movie.title}</div>
    </div>
  );
};

export default MovieCard;
