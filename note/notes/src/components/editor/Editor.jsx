import React from 'react';
import { FiBold, FiItalic, FiList, FiLink, FiUnderline } from 'react-icons/fi';

const Editor = () => {
  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button className="toolbar-button">
          <FiBold size={16} />
        </button>
        <button className="toolbar-button">
          <FiItalic size={16} />
        </button>
        <button className="toolbar-button">
          <FiUnderline size={16} />
        </button>
        <button className="toolbar-button">
          <FiList size={16} />
        </button>
        <button className="toolbar-button">
          <FiLink size={16} />
        </button>
        <select className="toolbar-button" defaultValue="Text">
          <option>Text</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
          <option>Heading 3</option>
        </select>
      </div>
      
      <div className="editor-content">
        <textarea
          className="editor-textarea"
          placeholder="Write about Clibu notes..."
        />
      </div>

      <div className="status-bar">
        <span>Last saved: a few seconds ago</span>
      </div>
    </div>
  );
};

export default Editor; 