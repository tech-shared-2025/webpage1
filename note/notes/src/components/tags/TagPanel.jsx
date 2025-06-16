import React from 'react';
import { FiPlus, FiTag } from 'react-icons/fi';

const TagPanel = () => {
  const tags = [
    { id: 1, name: 'AP', count: 1 },
    { id: 2, name: 'Personal', count: 1 },
    { id: 3, name: 'XDA', count: 1 }
  ];

  return (
    <div className="tags-panel">
      <div className="tag-header">
        <button className="icon-button">
          <FiPlus size={16} />
          New Tag
        </button>
      </div>
      <div className="tag-list">
        {tags.map(tag => (
          <div key={tag.id} className="tag-item">
            <FiTag size={14} color="var(--text-secondary)" />
            <span className="tag-name">{tag.name}</span>
            <span className="tag-count">{tag.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagPanel; 