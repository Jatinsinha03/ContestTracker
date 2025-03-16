// src/FilterBar.js
import React from 'react';
import './FilterBar.css'

function FilterBar({ platforms, selectedPlatforms, onChange }) {
    const handleCheckboxChange = (event) => {
        const changedPlatform = event.target.value;
        const isChecked = event.target.checked;

        const newSelectedPlatforms = isChecked
            ? [...selectedPlatforms, changedPlatform]
            : selectedPlatforms.filter(p => p !== changedPlatform);

        onChange(newSelectedPlatforms);
    };

    return (
        <div className="filter-bar">
            <h2>Filters : </h2>
            {platforms.map(platform => (
                <label key={platform}>
                    <input
                        type="checkbox"
                        value={platform}
                        onChange={handleCheckboxChange}
                        checked={selectedPlatforms.includes(platform)}
                    />
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </label>
            ))}
        </div>
    );
}

export default FilterBar;
