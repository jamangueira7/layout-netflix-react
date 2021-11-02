import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import './App.css';

function App() {

    const [movieList, setMovielist] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);

    useEffect(() => {
        const loadAll = async () => {
            let list = await Tmdb.getHomeList();
            setMovielist(list);

            let originals = list.filter(i=>i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].item.results.length - 1));
            let chosen = originals[0].item.results[randomChosen];

            let chosenInfo = await Tmdb.getMovieId(chosen.id, 'tv');
            setFeaturedData(chosenInfo);
        }

        loadAll();
    }, []);
  return (
    <div className="page">
        {featuredData &&
            <FeatureMovie item={featuredData}/>
        }
        <section className="lists">
            {movieList.map((item, key) => (
                  <MovieRow key={key} title={item.title} items={item.item}/>
            ))}
        </section>
    </div>
  );
}

export default App;
