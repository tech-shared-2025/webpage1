import React from 'react';
import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi';

const TopToolbar = () => {
  return (
    <div className="top-toolbar">
      <div className="search-bar">
        <FiSearch size={14} color="var(--text-secondary)" />
        <input
          type="text"
          className="search-input"
          placeholder="Search notes..."
        />
      </div>
      <button className="icon-button">
        <FiFilter size={16} />
      </button>
      <button className="button">
        <FiPlus size={14} style={{ marginRight: '4px' }} />
        New Note
      </button>
    </div>
  );
};

export default TopToolbar; 