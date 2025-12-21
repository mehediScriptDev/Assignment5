import React, { useState, useCallback } from 'react';
import Hero from './Components/Hero';
import SearchBar from './Components/SearchBar';
import Filters from './Components/Filters';
import Highlights from './Components/Highlights';
import JobsList from './Components/JobsList';

const Home = () => {
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState('');

    const onFiltersChange = useCallback((selected) => {
        // normalize keys to match JobsList expected names
        setFilters({
            jobTypes: selected.jobTypes || [],
            experienceLevels: selected.experienceLevels || [],
            salaryRanges: selected.salaryRanges || [],
            skills: selected.skills || []
        });
    }, []);

    const clearAll = () => {
        setFilters({});
        setSearch('');
    };

    return (
        <>
            <Hero />

            <section className="container mx-auto px-4 mb-8">
                <div className="card p-6 rounded-lg">
                    <SearchBar initial={search} onSearch={setSearch} />
                    <div className="mt-4 pt-4">
                        <Filters onChange={onFiltersChange} initial={{}} />
                        <div className="mt-2 text-sm text-muted-foreground"> <button className="underline" onClick={clearAll}>Clear All</button></div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4">
                <Highlights />
            </section>

            <JobsList filters={filters} search={search} />
        </>
    );
};

export default Home;