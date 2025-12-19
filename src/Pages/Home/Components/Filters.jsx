import React from 'react';

const Dropdown = ({ id, label, children }) => {
    return (
        <div className="dropdown">
            <button className="btn btn-outline text-xs h-8 px-3 flex items-center" onClick={() => window.toggleDropdown && window.toggleDropdown(id)}>
                {label}
                <i data-lucide="chevron-down" className="ml-2 h-3 w-3"></i>
            </button>
            <div id={id} className="dropdown-content card p-2">
                {children}
            </div>
        </div>
    )
}

const Filters = () => {
    const checkboxItem = (text) => (
        <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="checkbox" className="rounded border-input" />
            <span className="text-sm">{text}</span>
        </label>
    )

    return (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
            <span className="text-sm font-medium text-muted-foreground mr-2">Filters:</span>

            <Dropdown id="jobTypeDropdown" label="Job Type">
                <div className="space-y-1">
                    {checkboxItem('Full-time')}
                    {checkboxItem('Part-time')}
                    {checkboxItem('Contract')}
                    {checkboxItem('Internship')}
                </div>
            </Dropdown>

            <Dropdown id="experienceDropdown" label="Experience Level">
                <div className="space-y-1">
                    {checkboxItem('Entry Level')}
                    {checkboxItem('Mid Level')}
                    {checkboxItem('Senior Level')}
                    {checkboxItem('Lead/Principal')}
                </div>
            </Dropdown>

            <Dropdown id="salaryDropdown" label="Salary Range">
                <div className="space-y-1">
                    {checkboxItem('$0 - $50k')}
                    {checkboxItem('$50k - $100k')}
                    {checkboxItem('$100k - $150k')}
                    {checkboxItem('$150k+')}
                </div>
            </Dropdown>

            <Dropdown id="skillsDropdown" label="Skills">
                <div className="space-y-1">
                    {checkboxItem('JavaScript')}
                    {checkboxItem('React')}
                    {checkboxItem('Node.js')}
                    {checkboxItem('Python')}
                </div>
            </Dropdown>
        </div>
    );
};

export default Filters;
