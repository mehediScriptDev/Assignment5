import React from 'react';
import Hero from './Components/Hero';
import SearchBar from './Components/SearchBar';
import Filters from './Components/Filters';
import Highlights from './Components/Highlights';
import JobsList from './Components/JobsList';

const Home = () => {
    return (
        <>
            <Hero />

            <section className="container mx-auto px-4 mb-8">
                <div className="card p-6 rounded-lg">
                    <SearchBar />
                    <div className="mt-4 pt-4">
                        <Filters />
                        <div className="mt-2 text-sm text-muted-foreground"> <button className="underline">Clear All</button></div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4">
                <Highlights />
            </section>

            <JobsList />
        </>
    );
};

export default Home;