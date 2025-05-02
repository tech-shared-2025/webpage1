import React from 'react';
import { Bold, Italic, List, Heading1, Heading2, Heading3 } from 'lucide-react';

const FormatToolbar = ({ handleFormat }) => {
  return (
    <div className="format-toolbar">
      <button 
        className="toolbar-button" 
        title="Bold"
        onClick={() => handleFormat('bold')}
      >
        <Bold size={18} />
      </button>
      <button 
        className="toolbar-button" 
        title="Italic"
        onClick={() => handleFormat('italic')}
      >
        <Italic size={18} />
      </button>
      <div className="divider"></div>
      <button 
        className="toolbar-button" 
        title="Heading 1"
        onClick={() => handleFormat('h1')}
      >
        <Heading1 size={18} />
      </button>
      <button 
        className="toolbar-button" 
        title="Heading 2"
        onClick={() => handleFormat('h2')}
      >
        <Heading2 size={18} />
      </button>
      <button 
        className="toolbar-button" 
        title="Heading 3"
        onClick={() => handleFormat('h3')}
      >
        <Heading3 size={18} />
      </button>
      <div className="divider"></div>
      <button 
        className="toolbar-button" 
        title="List"
        onClick={() => handleFormat('list')}
      >
        <List size={18} />
      </button>
    </div>
  );
};

export default FormatToolbar;