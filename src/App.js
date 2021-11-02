import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';
import './App.css';

function App() {

    const [movieList, setMovielist] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [backHeader, setBlackHeader] = useState(false);

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

    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);
  return (
    <div className="page">
        <Header black={backHeader} />
        {featuredData &&
            <FeatureMovie item={featuredData}/>
        }
        <section className="lists">

            {movieList.map((item, key) => (
                  <MovieRow key={key} title={item.title} items={item.item}/>
            ))}
        </section>
        <footer>
            Feito com <span role="img" aria-label="coração">❤️</span> pela B7Web<br/>
            Direitos de imagem para Netflix<br/>
            Dados pegos dos site Themoviedb.org<br/>
        </footer>

        {movieList.length <= 0 &&
            <div className="loading">
                <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading" />
            </div>
        }

    </div>
  );
}


export default App;
