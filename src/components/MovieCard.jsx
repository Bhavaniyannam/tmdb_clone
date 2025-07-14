import React from 'react';

function MovieCard({movieObj, poster_path ,handleAddtoWatchlist, handleRemoveFromWatchlist, watchlist = []}) {
  function doesContain(movieObj){
    if (!watchlist || !movieObj) return false;
    for(let i=0; i<watchlist.length; i++){
      if(watchlist[i] && watchlist[i].id === movieObj.id){
        return true;
      }
    }
    return false;
  }
  return (
    <div
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl duration-300 hover:scale-110 hover:cursor-pointer flex flex-col justify-between items-end" style={{backgroundImage : `url(https://image.tmdb.org/t/p/original/${poster_path})`}}>
      
      {doesContain(movieObj) ? (<div onClick={()=>{handleRemoveFromWatchlist(movieObj)}} className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60'>
        &#128521;
      </div>) : (
        <div onClick={()=>{handleAddtoWatchlist(movieObj)}} className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60'>
        &#128525;
      </div>
  )} 
    </div>
  )
}

export default MovieCard
