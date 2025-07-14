import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'
import Pagination from './Pagination'

function Movies({ handleAddtoWatchlist, handleRemoveFromWatchlist, watchlist }) {
  const [movies, setMovies] = useState([])
  const [pageNo, setPageNo] = useState(1)

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1)
    }
  }

  const handleNext = () => {
    setPageNo(pageNo + 1)
  }

  useEffect(() => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    if (!apiKey) {
      // No API key, set movies to empty array
      setMovies([]);
      return;
    }
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNo}`)
      .then(res => {
        setMovies(res.data.results);
      })
      .catch(error => {
        // On error, set movies to empty array
        setMovies([]);
      });
  }, [pageNo])

  return (
    <div className='px-2 py-4'>
      {movies.length > 0 && (
        <div className='flex flex-row flex-wrap justify-center gap-8 mb-4'>
          {movies.map((movieObj) => (
            <MovieCard
              key={movieObj.id}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              handleAddtoWatchlist={handleAddtoWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              watchlist={watchlist || []}
            />
          ))}
        </div>
      )}
      <div className='text-2xl text-center font-bold mb-4'>
        Trending Movies
      </div>
      <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  )
}

export default Movies
