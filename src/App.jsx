import { useState, useEffect } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import MovieList from './components/MovieList'
import MovieSearch from './components/MovieSearch'
import { MovieProvider } from './context/MovieProvider'

function App() {

  const [movie, setMovie] = useState([])
  const [movieRate, setMovieRate] = useState([])
  const [movieSearch, setMovieSearch] = useState([])

  const handleSearch = async (searchVal) => {
    setMovieSearch([])
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=vi-VN&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const searchMovie = await fetch(url, options)
      const data = await searchMovie.json()
      setMovieSearch(data.results)
    } catch (error) {

    }
  }
  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const url = 'https://api.themoviedb.org/3/movie/popular?language=vi-VN&page=1';
      const url2 = 'https://api.themoviedb.org/3/movie/top_rated?language=vi-VN&page=1';

      const [res1, res2] = await Promise.all([
        fetch(url, options),
        fetch(url2, options)
      ]);


      const data1 = await res1.json();
      const data2 = await res2.json();
      // const response = await fetch(url, options);
      // const data = await response.json();

      // fetch(url, options)
      // .then(res => res.json())
      // .then(json => console.log(json))
      // .catch(err => console.error(err));

      setMovie(data1.results)
      setMovieRate(data2.results)
      console.log(data1)
    }


    fetchMovie()
  }, [])

  return (
    <>
      <MovieProvider>

        <div className='bg-black pb-10 text-white'>
          <Header onSearch={handleSearch}></Header>
          <Banner></Banner>
          {
            movieSearch.length > 0 ?
              <MovieSearch title={"Kết quả tìm kiếm"} data={movieSearch}></MovieSearch> :
              (
                <>
                  <MovieList title={"Phim Hot"} data={movie}></MovieList>
                  <MovieList title={"Phim Đề Cử"} data={movieRate}></MovieList>
                </>
              )
          }

        </div>
      </MovieProvider>

    </>
  )
}

export default App
