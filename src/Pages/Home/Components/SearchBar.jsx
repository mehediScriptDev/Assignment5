import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ initial = '', onSearch }) => {
    const [q, setQ] = useState(initial || '');

    useEffect(() => {
        setQ(initial || '');
    }, [initial]);

    const submit = (e) => {
        e && e.preventDefault();
        onSearch && onSearch(q.trim());
    };

    return (
        <form className="space-y-4" onSubmit={submit}>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 ring ring-transparent focus-within:ring-primary rounded-md place-content-center transition-all">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input value={q} onChange={(e) => setQ(e.target.value)} type="text" placeholder="Search jobs by title, skill..." className="input pl-10 w-full outline-none border-none" />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary flex gap-2 self-start md:self-stretch">
                    <FiSearch className="h-4 w-4 mr-2" />
                    Search Jobs
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
