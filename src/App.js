import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';

function App() {

    const [movieList, setMovielist] = useState([]);

    useEffect(() => {
        const loadAll = async () => {
            let list = await Tmdb.getHomeList();
            setMovielist(list);
        }

        loadAll();
    }, []);
  return (
    <div className="page">
        <section className="list">
            {movieList.map((item, key) => (
                  <MovieRow key={key} title={item.title} items={item.item}/>
            ))}
        </section>
    </div>
  );
}

export default App;
