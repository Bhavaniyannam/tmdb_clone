import {React,useEffect,useState} from 'react';
import genreids from '../utility/genre';

function WatchList({watchlist=[], setWatchlist, handleRemoveFromWatchlist}) {

  const [search, setSearch] = useState('');
  const [genrelist, setGenreList] = useState(['All Genres']);
  const [currGenre , setCurrGenre] = useState('All Genres');

  let handleSearch = (e)=> {
    setSearch(e.target.value);
    console.log(search);
  }
let handlefilter = (genre) => {
  setCurrGenre(genre);
}

let sortIncreasing = () => {
  let sortedIncreasing = [...watchlist].sort((a, b) =>{
    return a.vote_average - b.vote_average
  })
  setWatchlist(sortedIncreasing);
}
let sortDecreasing = () => {
  let sortedDecreasing = [...watchlist].sort((a, b) =>{
    return b.vote_average - a.vote_average
  });
  setWatchlist(sortedDecreasing);
}

useEffect(() => {
  let temp = watchlist.map((movieObj) => {
    return genreids[movieObj.genre_ids[0]];
  });
  temp = new Set(temp);
  const newGenreList = ['All Genres', ...temp];
  // Only update if different to avoid infinite loop
  if (JSON.stringify(newGenreList) !== JSON.stringify(genrelist)) {
    setGenreList(newGenreList);
  }
}, [watchlist, genrelist]);

  return (
    <>
<div className='flex justify-center flex-wrap my-4'>
  {genrelist.map((genre) => (
    <div
      key={genre}
      onClick={() => handlefilter(genre)}
      className={
        currGenre === genre
          ? 'flex justify-center items-center mx-4 h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold'
          : 'flex justify-center items-center mx-4 h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold m-4'
      }
    >
      {genre}
    </div>
  ))}
</div>

    <div className='flex my-4 justify-center'>
      <input onChange={handleSearch} value={search} type='text' placeholder='Search movie' className='p-2 border bg-gray-100 rounded' />
    </div>
    <div className='overflow-hidden rounded-lg border border-gray-200 m-8'>
      <table className='w-full text-gray-500 text-center'>
        <thead className='border-b-2'>
          <tr>
            <th>Name</th>
            <th className='flex items-center justify-center'>
              <div onClick={sortIncreasing} className='p-2'><i className="fa-solid fa-arrow-up"></i></div>
              <div>Ratings</div>
              <div onClick={sortDecreasing} className='p-2'><i className="fa-solid fa-arrow-down"></i></div>
            </th>
    
            <th>Popularity</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>

          {watchlist.filter((movieObj)=>{
            if (currGenre === 'All Genres') {
              return true;
            }
            return genreids[movieObj.genre_ids[0]] === currGenre;
          }).filter((movieObj) => {
            return movieObj.title.toLowerCase().includes(search.toLocaleLowerCase());
          }).map((movieObj) => {
            console.log('Poster path for', movieObj.title, ':', movieObj.poster_path);
            return <tr className='border-b-2' key={movieObj.id}>
            <td className='flex items-center px-6 py-4'>
              <img className='h-[6rem] w-[10rem]' src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} alt={movieObj.title}/>
              <div className='mx-10'>{movieObj.title}</div>
            </td>
            <td>{movieObj.vote_average}</td>
            <td>{movieObj.popularity}</td>
            <td>{genreids[movieObj.genre_ids[0]]}</td>
            <td onClick={()=>{handleRemoveFromWatchlist(movieObj)}} className='text-red-800'>Delete</td>
          </tr>
          }
          )}

          
        </tbody>

      </table>
    </div>
    </>
  )
}

export default WatchList
