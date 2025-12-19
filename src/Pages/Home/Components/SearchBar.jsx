import React from 'react';

const SearchBar = () => {
    return (
        <div className="card p-6">
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 ring ring-transparent focus-within:ring-primary rounded-md place-content-center transition-all">
                        <div className="relative">
                            <i data-lucide="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"></i>
                            <input type="text" placeholder="Search jobs by title, skill..." className="input pl-10 w-full outline-none border-none" />
                        </div>
                    </div>

                    <button className="btn btn-primary flex gap-2">
                        <i data-lucide="search" className="h-4 w-4 mr-2"></i>
                        Search Jobs
                    </button>
                </div>

                {/* Filters will be rendered by parent via Filters component */}
            </div>
        </div>
    );
};

export default SearchBar;
