import React, { useState, useEffect } from 'react';
import { useAuth} from '../../store/auth';
import './MovieForm.css';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [duration, setDuration] = useState('');
  const [language, setLanguage] = useState('');
  const [country, setCountry] = useState('');
  const [imagePath, setImagePath] = useState(null);
  const [userId, setUserId] = useState(null);

  const { authorizationToken, userAuthentication  } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userAuthentication(authorizationToken);
        if (userData) {
          setUserId(userData._id);
          console.log("Fetched user ID:", userData._id);
        } else {
          console.error("User data is null");
        }
      } catch (error) {
        console.error("Error fetching user data");
      }
    };

    fetchUserData();
  }, [authorizationToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('releaseYear', releaseYear);
    formData.append('genre', genre);
    formData.append('rating', rating);
    formData.append('duration', duration);
    formData.append('language', language);
    formData.append('country', country);
    formData.append('imagePath', imagePath);

    if (userId) {
      formData.append('userId', userId);
      console.log("Appended user ID:", userId);
    } else {
      console.error("User ID is not set");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/movies', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Movie created:", data);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="movie-form-container">
      <form onSubmit={handleSubmit} className="movie-form">
        <h2>Upload Movie</h2>
        <div className="form-columns">
          <div className="form-column">
            <div className="form-group">
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Release Year:</label>
              <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Genre:</label>
              <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </div>
          </div>
          <div className="form-column">
            <div className="form-group">
              <label>Rating:</label>
              <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Duration:</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Language:</label>
              <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Country:</label>
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Poster/Banner:</label>
              <input type="file" onChange={(e) => setImagePath(e.target.files[0])} />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;

