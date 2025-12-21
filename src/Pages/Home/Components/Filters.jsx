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

const defaultOptions = {
    jobTypes: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    experienceLevels: ['Entry Level', 'Mid Level', 'Senior Level', 'Lead/Principal'],
    salaryRanges: ['$0 - $50k', '$50k - $100k', '$100k - $150k', '$150k+'],
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
};

const Filters = ({ options = {}, onChange, initial = {} }) => {
    const merged = { ...defaultOptions, ...options };
    const [openId, setOpenId] = useState(null);
    const [selected, setSelected] = useState({
        jobTypes: initial.jobTypes || [],
        experienceLevels: initial.experienceLevels || [],
        salaryRanges: initial.salaryRanges || [],
        skills: initial.skills || [],
    });

    useEffect(() => {
        onChange && onChange(selected);
    }, [selected, onChange]);

    const toggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };
    const closeAll = () => setOpenId(null);

    const isChecked = (category, value) => selected[category].includes(value);

    const toggleItem = (category, value) => {
        setSelected((prev) => {
            const set = new Set(prev[category]);
            if (set.has(value)) set.delete(value);
            else set.add(value);
            return { ...prev, [category]: Array.from(set) };
        });
    };

    const clearCategory = (category) => {
        setSelected((prev) => ({ ...prev, [category]: [] }));
    };

    const checkboxItem = (category, text) => {
        const id = `${category}-${text}`.replace(/\s+/g, '-').toLowerCase();
        return (
            <label key={id} className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
                <input
                    id={id}
                    type="checkbox"
                    className="rounded border-input"
                    checked={isChecked(category, text)}
                    onChange={() => toggleItem(category, text)}
                />
                <span className="text-sm">{text}</span>
            </label>
        );
    };

    return (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
            <span className="text-sm font-medium text-muted-foreground mr-2">Filters:</span>

            <Dropdown id="jobTypeDropdown" label="Job Type" isOpen={openId === 'jobTypeDropdown'} onToggle={toggle} onClose={closeAll}>
                <div className="space-y-1">
                    {merged.jobTypes.map((t) => checkboxItem('jobTypes', t))}
                    <div className="flex justify-end pt-2">
                        <button className="text-xs text-muted-foreground" onClick={() => clearCategory('jobTypes')}>Clear</button>
                    </div>
                </div>
            </Dropdown>

            <Dropdown id="experienceDropdown" label="Experience Level" isOpen={openId === 'experienceDropdown'} onToggle={toggle} onClose={closeAll}>
                <div className="space-y-1">
                    {merged.experienceLevels.map((t) => checkboxItem('experienceLevels', t))}
                    <div className="flex justify-end pt-2">
                        <button className="text-xs text-muted-foreground" onClick={() => clearCategory('experienceLevels')}>Clear</button>
                    </div>
                </div>
            </Dropdown>

            <Dropdown id="salaryDropdown" label="Salary Range" isOpen={openId === 'salaryDropdown'} onToggle={toggle} onClose={closeAll}>
                <div className="space-y-1">
                    {merged.salaryRanges.map((t) => checkboxItem('salaryRanges', t))}
                    <div className="flex justify-end pt-2">
                        <button className="text-xs text-muted-foreground" onClick={() => clearCategory('salaryRanges')}>Clear</button>
                    </div>
                </div>
            </Dropdown>

            <Dropdown id="skillsDropdown" label="Skills" isOpen={openId === 'skillsDropdown'} onToggle={toggle} onClose={closeAll}>
                <div className="space-y-1">
                    {merged.skills.map((t) => checkboxItem('skills', t))}
                    <div className="flex justify-end pt-2">
                        <button className="text-xs text-muted-foreground" onClick={() => clearCategory('skills')}>Clear</button>
                    </div>
                </div>
            </Dropdown>
        </div>
    );
};

export default Filters;
