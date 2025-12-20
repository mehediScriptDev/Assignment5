import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FiChevronRight, FiRotateCcw, FiChevronDown, FiMapPin, FiBriefcase, FiDollarSign, FiClock, FiEye, FiLoader } from 'react-icons/fi';
import { BiBuilding } from 'react-icons/bi';

const AppliedJobs = () => {
  const filtersFormRef = useRef(null);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);
  const [sort, setSort] = useState('newest');

  const resetFilters = () => {
    if (filtersFormRef.current) filtersFormRef.current.reset();
  };

  const toggleSort = () => setSortOpen(s => !s);
  const selectSort = (value) => { setSort(value); setSortOpen(false); };

  useEffect(() => {
    if (!sortOpen) return;
    const onDocClick = (e) => {
      if (!sortRef.current) return;
      if (!sortRef.current.contains(e.target)) setSortOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setSortOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('touchstart', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('touchstart', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [sortOpen]);

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link to="/user-dashboard" className="hover:text-primary">Dashboard</Link>
          <FiChevronRight className="h-4 w-4" />
          <span className="text-foreground">Applied Jobs</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Applied Jobs</h1>
            <p className="text-muted-foreground">Track all your job applications in one place</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">12</span> applications
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="font-semibold mb-4">Filters</h2>
            <form ref={filtersFormRef} className="mb-6">
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Application Status</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" defaultChecked />
                  <span className="text-sm">All</span>
                  <span className="ml-auto text-xs text-muted-foreground">12</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-sm">Under Review</span>
                  <span className="ml-auto text-xs text-muted-foreground">5</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-sm">Shortlisted</span>
                  <span className="ml-auto text-xs text-muted-foreground">3</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-sm">Rejected</span>
                  <span className="ml-auto text-xs text-muted-foreground">2</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Application Date</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="date" className="border-input" defaultChecked />
                  <span className="text-sm">All Time</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="date" className="border-input" />
                  <span className="text-sm">Last 7 Days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="date" className="border-input" />
                  <span className="text-sm">Last 30 Days</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="date" className="border-input" />
                  <span className="text-sm">Last 3 Months</span>
                </label>
              </div>
            </div>

            <button type="button" onClick={resetFilters} className="btn btn-outline w-full">
              <FiRotateCcw className="h-4 w-4 mr-2" />
              Reset Filters
            </button>
            </form>
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-4">
          {/* Sort area */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div ref={sortRef} className="flex items-center gap-2 relative">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <div className="relative inline-block">
                <button type="button" onClick={toggleSort} className="btn btn-outline text-sm h-9 flex items-center">
                  <span className="capitalize">{sort === 'newest' ? 'Newest First' : sort === 'oldest' ? 'Oldest First' : sort}</span>
                  <FiChevronDown className="h-4 w-4 ml-2" />
                </button>

                {sortOpen && (
                  <div className="absolute mt-2 right-0 w-44 card p-2 z-50" style={{ minWidth: 160 }}>
                    <button type="button" onClick={() => selectSort('newest')} className="w-full text-left p-2 hover:bg-accent rounded">Newest First</button>
                    <button type="button" onClick={() => selectSort('oldest')} className="w-full text-left p-2 hover:bg-accent rounded">Oldest First</button>
                    <button type="button" onClick={() => selectSort('recently-updated')} className="w-full text-left p-2 hover:bg-accent rounded">Recently Updated</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Example application cards - replicate the HTML structure */}
          <div className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="shrink-0">
                <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center">
                    <BiBuilding className="h-8 w-8 text-primary" />
                  </div>
              </div>

              <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      <Link to="/job-details" className="hover:text-primary">Senior Full Stack Developer</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      <Link to="/company-profile" className="hover:text-primary">TechCorp Solutions</Link>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-800 border border-yellow-200"
                    aria-label="Application status: Under Review"
                    aria-pressed="true"
                    disabled
                  >
                    <span className="whitespace-nowrap">Under Review</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><FiMapPin className="h-4 w-4" /> San Francisco, CA</span>
                  <span className="flex items-center gap-1"><FiBriefcase className="h-4 w-4" /> Full-time</span>
                  <span className="flex items-center gap-1"><FiDollarSign className="h-4 w-4" /> $120k - $160k</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><FiClock className="h-3 w-3" /> Applied on Nov 25, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/job-details" className="btn btn-outline text-sm h-9">
                      <FiEye className="h-4 w-4 mr-2" />
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Load More */}
          <div className="flex justify-center pt-6">
            <button className="btn btn-outline">
              <FiLoader className="h-4 w-4 mr-2 animate-spin" />
              Load More Applications
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppliedJobs;
