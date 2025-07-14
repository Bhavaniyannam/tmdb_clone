import './App.css';
import React, { useState,useEffect } from 'react';
import Movies from './components/Movies';
import WatchList from './components/WatchList';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';

function App() {

  let [watchlist, setWatchlist] = useState([]);

  let handleAddtoWatchlist = (movieObj) => {
    if (!watchlist.find(movie => movie.id === movieObj.id)) {
      let newWatchlist = [...watchlist, movieObj];
      localStorage.setItem('MovieApp', JSON.stringify(newWatchlist));
      setWatchlist(newWatchlist);
      console.log(newWatchlist);
    }
  }
 let handleRemoveFromWatchlist = (movieObj) => {
  let filteredWatchlist = watchlist.filter((movie) => {
    return movie.id !== movieObj.id;
  })
  setWatchlist(filteredWatchlist);
  localStorage.setItem('MovieApp', JSON.stringify(filteredWatchlist));
 }

  useEffect(() => {
  let movieFromLocalStorage = localStorage.getItem('MovieApp');
  if (movieFromLocalStorage) {
    let parsedList = JSON.parse(movieFromLocalStorage);
    // Filter duplicates by movie id
    let uniqueList = parsedList.filter((movie, index, self) =>
      index === self.findIndex((m) => m.id === movie.id)
    );
    setWatchlist(uniqueList);
  }
 }, []);

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<> <Banner/> <Movies watchlist={watchlist} handleAddtoWatchlist={handleAddtoWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist}/></>}/>
      <Route path='/watchlist' element={<WatchList watchlist={watchlist} setWatchlist={setWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist}/>}/>
    </Routes>
   </BrowserRouter>
    </>
  );
}

export default App;
