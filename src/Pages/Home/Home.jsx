import React from 'react';
import Hero from './Components/Hero';
import SearchBar from './Components/SearchBar';
import Filters from './Components/Filters';
import Highlights from './Components/Highlights';

const Home = () => {
    return (
        <>
            <Hero />
            <SearchBar />
            <Filters />
            <Highlights />
        </>
    );
};

export default Home;