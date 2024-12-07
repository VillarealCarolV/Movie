import axios from "axios";
import "./Form.css";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    popularity: "",
    releaseDate: "",
    voteAverage: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showAll, setShowAll] = useState(false); 
  const [showAllCast, setShowAllCast] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

const handleShowMoreCast = () => setShowAllCast(!showAllCast);
const videosToShow = showAll ? videos : videos.slice(0, 3);

  let { movieId } = useParams();
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    setError("");
    if (!query) {
      setError("Please search a movie");
      return;
    }

    setIsLoading(true);
    setSearchedMovieList([]);
    
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2Q4YTQwMGVlMzFkMzQ4MGYzNjdlMjk2OGMzODhhZSIsIm5iZiI6MTczMzE1MTAyNS4yNTQwMDAyLCJzdWIiOiI2NzRkYzkzMTc0NzM3NzhiYmQ5YWY3YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4wKA26LOjYKY3fGsk-zmp0YOvGr7YPfi_IWUf6W7MSE", 
      },
    })
      .then((response) => {
        if (response.data.results.length === 0) {
          setError("No movies found matching your search");
        } else {
          setSearchedMovieList(response.data.results);
          setTotalPages(response.data.total_pages);
        }
      })
      .catch(() => {
        setError("Unable to search movies at this time. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, currentPage]);

  useEffect(() => {
    if (currentPage > 1) {
      handleSearch();
    }
  }, [currentPage, handleSearch]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    });
    setError("");

    
    fetchMovieDetails(movie.id);
  };

  const fetchMovieDetails = (movieId) => {
    setIsLoading(true);

   
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2Q4YTQwMGVlMzFkMzQ4MGYzNjdlMjk2OGMzODhhZSIsIm5iZiI6MTczMzE1MTAyNS4yNTQwMDAyLCJzdWIiOiI2NzRkYzkzMTc0NzM3NzhiYmQ5YWY3YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4wKA26LOjYKY3fGsk-zmp0YOvGr7YPfi_IWUf6W7MSE" }, 
      })
      .then((response) => setCast(response.data.cast))
      .catch((error) => console.error("Error fetching cast and crew", error));

    
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
        headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2Q4YTQwMGVlMzFkMzQ4MGYzNjdlMjk2OGMzODhhZSIsIm5iZiI6MTczMzE1MTAyNS4yNTQwMDAyLCJzdWIiOiI2NzRkYzkzMTc0NzM3NzhiYmQ5YWY3YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4wKA26LOjYKY3fGsk-zmp0YOvGr7YPfi_IWUf6W7MSE" }, 
      })
      .then((response) => setPhotos(response.data.backdrops))
      .catch((error) => console.error("Error fetching photos", error));

    
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2Q4YTQwMGVlMzFkMzQ4MGYzNjdlMjk2OGMzODhhZSIsIm5iZiI6MTczMzE1MTAyNS4yNTQwMDAyLCJzdWIiOiI2NzRkYzkzMTc0NzM3NzhiYmQ5YWY3YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4wKA26LOjYKY3fGsk-zmp0YOvGr7YPfi_IWUf6W7MSE" }, 
      })
      .then((response) => setVideos(response.data.results))
      .catch((error) => console.error("Error fetching videos", error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (movieId) {
      setIsLoading(true);
      setError("");

      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
          const tempData = {
            id: response.data.tmdbId,
            original_title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            poster_path: response.data.posterPath.replace(
              "https://image.tmdb.org/t/p/original/",
              ""
            ),
            release_date: response.data.releaseDate,
            vote_average: response.data.voteAverage,
          };
          setSelectedMovie(tempData);
          setFormData({
            title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            releaseDate: response.data.releaseDate,
            voteAverage: response.data.voteAverage,
          });
          fetchMovieDetails(response.data.tmdbId); 
        })
        .catch(() => {
          setError("Unable to load movie details. Please try again later.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [movieId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCastChange = (index, field, value) => {
    const updatedCast = [...cast];
    updatedCast[index][field] = value;
    setCast(updatedCast);
  };
  

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCurrentPage(1);
      handleSearch();
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.title) errors.push("Title is required");
    if (!formData.overview) errors.push("Overview is required");
    if (!formData.releaseDate) errors.push("Release date is required");
    if (!formData.popularity) errors.push("Popularity is required");
    if (!formData.voteAverage) errors.push("Vote average is required");
    if (!selectedMovie) errors.push("Please select a movie from search results");
    return errors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    setIsLoading(true);
    setError("");

    const accessToken = localStorage.getItem('accessToken');
    if (!selectedMovie) {
      alert('Please search and select a movie.');
      return;
    }

    const data =console.log("Data to be sent:", {
      tmdbId: selectedMovie.id,
      title: formData.title,
      overview: formData.overview,
      popularity: parseFloat(formData.popularity),
      releaseDate: formData.releaseDate,
      voteAverage: parseFloat(formData.voteAverage),
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: 0,
      videos: videos || [],
      casts: cast || [],
      photos: photos || [],
    });
        
      await axios({
        method: movieId ? "patch" : "post",
        url: movieId ? `/movies/${movieId}` : '/movies',
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
       alert('Movie saved successfully!');
       navigate("/main/movies");
    })
    .catch ((error) => {
      console.error("Error saving movie:", error.response?.data || error.message);
    });
  };

  const handleUpdate = handleSave;

  useEffect(() => {
    if (movieId) {
    
      axios.get(`/movies/${movieId}`)
        .then((response) => {
          const movieData = response.data;
          setSelectedMovie({
            id: movieData.tmdbId,
            original_title: movieData.title,
            overview: movieData.overview,
            popularity: movieData.popularity,
            poster_path: movieData.posterPath.replace("https://image.tmdb.org/t/p/original/", ""),
            release_date: movieData.releaseDate,
            vote_average: movieData.voteAverage,
          });
          setFormData({
            title: movieData.title,
            overview: movieData.overview,
            popularity: movieData.popularity,
            releaseDate: movieData.releaseDate,
            voteAverage: movieData.voteAverage,
            videos: movieData.videos || [],
            cast: movieData.cast || [],
            photos: movieData.photos || [],
          });
        })
        .catch(() => {
          setError("Unable to load movie details. Please try again later.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [movieId]);


  return (
    <>
      <h1>{movieId !== undefined ? "Edit" : "Create"} Movie</h1>

      {error && <div className="error-message">{error}</div>}
  {isLoading && <div className="loading-message">Loading...</div>}

  {movieId === undefined && (
    <>
       <div className="movie-container">
      <div className="search-container">
              <input
                type="text"
                placeholder="Search for a movie..."
                onChange={(event) => setQuery(event.target.value)}
              />
              <button className="search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>

            <div className="searched-movie">
              {searchedMovieList.map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))}
            </div>

            <div className="paginations">
              <button
                onClick={() => {
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>{` Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() => {
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            </div>
        </>
      )}


<form onSubmit={(e) => e.preventDefault()}>
  <div className="container">
    {selectedMovie && (
      <div className="content-wrapper">
        <div className="poster-section">
          <img
            className="poster-image"
            src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
            alt={formData.title}
          />
        </div>
        <div className="details-container">
          <div className="content-wrapper">
          <div className="form-fields">
            <div className="field title-field">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="field overview-field">
              <label htmlFor="overview">Overview</label>
              <textarea
                className="overview"
                rows={10}
                name="overview"
                id="overview"
                value={formData.overview}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="field popularity-field">
              <label htmlFor="popularity">Popularity</label>
              <input
                type="number"
                name="popularity"
                id="popularity"
                value={formData.popularity}
                onChange={handleInputChange}
                disabled={isLoading}
                step="0.1"
              />
            </div>
            <div className="field releasedate-field">
              <label htmlFor="releaseDate">Release Date</label>
              <input
                type="date"
                name="releaseDate"
                id="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="field voteaverage-field">
              <label htmlFor="voteAverage">Vote Average</label>
              <input
                type="number"
                name="voteAverage"
                id="voteAverage"
                value={formData.voteAverage}
                onChange={handleInputChange}
                disabled={isLoading}
                step="0.1"
              />
            </div>
          </div>
          </div>
          <div className="additional-info">
            <div className="cast-container">
              <div className="cast-header">
                <h2>Cast</h2>
              </div>
              {cast.slice(0, showAllCast ? cast.length : 6).map((member) => (
                <div key={member.id} className="cast-card">
                  {member.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                      alt={member.name}
                      className="cast-photo"
                    />
                  ) : (
                    <div className="no-photo">No Photo</div>
                  )}
                  <div className="cast-details">
                    <h3>{member.name}</h3>
                    <p>Character: {member.character}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="videos">
              <div className="video-header">
                <h2>Videos</h2>
              </div>
              {videos.length > 0 ? (
                videosToShow.slice(0, showAllVideos ? videosToShow.length : 3).map(video => (
                  <div key={video.id} className="video-item">
                    <h3>{video.name}</h3>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      width="800"
                      height="400"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))
              ) : (
                <p>No videos available.</p>
              )}
            </div>
            <div className="photos">
              <div className="photos-header">
                <h2>Photos</h2>
              </div>
              <div className="photo-grid">
                {photos.slice(0, 3).map((photo) => (
                  <img
                    key={photo.file_path}
                    src={`https://image.tmdb.org/t/p/original${photo.file_path}`}
                    alt="Movie Photo"
                    width="180"
                    height="300"
                    className="photos-item"
                  />
                ))}
              </div>
            </div>
          </div>


          <div className="button-container">
            <button className="save-btn" type="button" onClick={handleSave}>
              {movieId ? 'Update' : 'Save'}
            </button>
            <button
              className="back-btn"
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to exit?')) {
                  navigate('/main/movies');
                }
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</form>
</>
);
};

export default Form;