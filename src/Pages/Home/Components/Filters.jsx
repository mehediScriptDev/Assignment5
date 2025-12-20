import React, { useState, useRef, useEffect } from 'react';
import { FiFilter, FiChevronDown } from 'react-icons/fi';

const Dropdown = ({ id, label, children, isOpen, onToggle, onClose }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const onDocClick = (e) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target)) {
                onClose && onClose();
            }
        };

        const onKey = (e) => {
            if (e.key === 'Escape') onClose && onClose();
        };

        document.addEventListener('mousedown', onDocClick);
        document.addEventListener('touchstart', onDocClick);
        document.addEventListener('keydown', onKey);

        return () => {
            document.removeEventListener('mousedown', onDocClick);
            document.removeEventListener('touchstart', onDocClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [isOpen, onClose]);

    return (
        <div ref={ref} className="dropdown relative inline-block">
            <button data-dropdown-for={id} className="btn btn-outline text-xs h-8 px-3 flex items-center" onClick={() => onToggle && onToggle(id)}>
                <FiFilter className="h-3 w-3 mr-2" />
                {label}
                <FiChevronDown className="ml-2 h-3 w-3" />
            </button>
            <div id={id} className={`dropdown-content card p-2 absolute mt-2 ${isOpen ? 'show' : ''}`} style={{ minWidth: 160 }}>
                {children}
            </div>
        </div>
    )
}

const Filters = () => {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        setOpenId(prev => prev === id ? null : id);
    };
    const closeAll = () => setOpenId(null);
    const checkboxItem = (text) => (
        <label className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
            <input type="checkbox" className="rounded border-input" />
            <span className="text-sm">{text}</span>
        </label>
    )

    return (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
            <span className="text-sm font-medium text-muted-foreground mr-2">Filters:</span>

            <Dropdown id="jobTypeDropdown" label="Job Type" isOpen={openId === 'jobTypeDropdown'} onToggle={toggle} onClose={closeAll}>
                <div className="space-y-1">
                    {checkboxItem('Full-time')}
                    {checkboxItem('Part-time')}
                    {checkboxItem('Contract')}
                    {checkboxItem('Internship')}
                </div>
            </Dropdown>

            <Dropdown id="experienceDropdown" label="Experience Level" isOpen={openId === 'experienceDropdown'} onToggle={toggle} onClose={closeAll}>
                <div className="space-y-1">
                    {checkboxItem('Entry Level')}
                    {checkboxItem('Mid Level')}
                    {checkboxItem('Senior Level')}
                    {checkboxItem('Lead/Principal')}
                </div>
            </Dropdown>

            <Dropdown id="salaryDropdown" label="Salary Range" isOpen={openId === 'salaryDropdown'} onToggle={toggle} onClose={closeAll}>
                <div className="space-y-1">
                    {checkboxItem('$0 - $50k')}
                    {checkboxItem('$50k - $100k')}
                    {checkboxItem('$100k - $150k')}
                    {checkboxItem('$150k+')}
                </div>
            </Dropdown>

            <Dropdown id="skillsDropdown" label="Skills" isOpen={openId === 'skillsDropdown'} onToggle={toggle} onClose={closeAll}>
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
