import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase storage methods
import './UpdateMovie.css'; // Import the CSS file

const UpdateMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();
  const [movieData, setMovieData] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [duration, setDuration] = useState('');
  const [language, setLanguage] = useState('');
  const [country, setCountry] = useState('');
  const [imagePath, setImagePath] = useState(null); // State to hold the new image file

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://deployment-mern-moviemania.vercel.app/api/movies/${id}`, {
          headers: {
            Authorization: authorizationToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMovieData(data);
          setTitle(data.title);
          setDescription(data.description);
          setReleaseYear(data.releaseYear);
          setGenre(data.genre);
          setRating(data.rating);
          setDuration(data.duration);
          setLanguage(data.language);
          setCountry(data.country);
          setImagePath(data.imagePath); // Set the current image URL
        } else {
          console.error('Error fetching movie details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id, authorizationToken]);

  const handleImageUpload = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = imagePath;

    // Upload new image if a new file is selected
    if (imagePath instanceof File) {
      imageUrl = await handleImageUpload(imagePath);
    }

    try {
      const response = await fetch(`https://deployment-mern-moviemania.vercel.app/api/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify({
          title,
          description,
          releaseYear,
          genre,
          rating,
          duration,
          language,
          country,
          imagePath: imageUrl, // Update image path
        }),
      });

      if (response.ok) {
        console.log('Movie updated successfully.');
        navigate(`/movies/${id}`);
      } else {
        console.error('Error updating movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  return (
    <div className="movie-form-container">
      <h2>Update Movie</h2>
      {movieData && (
        <form onSubmit={handleSubmit} className="movie-form">
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
                {typeof imagePath === 'string' && (
                  <img src={imagePath} alt="Current movie poster" style={{ marginTop: '10px', width: '200px' }} />
                )}
              </div>
            </div>
          </div>
          <div className="button-container">
            <button type="submit">Update</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateMoviePage;
