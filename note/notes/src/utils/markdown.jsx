
const renderMarkdown = (text) => {
    if (!text) return '';
    
    // Process the markdown
    let processed = text;
    
    // Headers
    processed = processed.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
    processed = processed.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    processed = processed.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    
    // Bold and italic
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Lists
    processed = processed.replace(/^- (.*?)$/gm, '<li>$1</li>');
    processed = processed.replace(/<li>(.*?)<\/li>/gm, function(match) {
      return '<ul>' + match + '</ul>';
    });
    
    // Paragraphs and line breaks
    processed = processed.split('\n').map(line => {
      if (!line.trim()) return '';
      if (!line.startsWith('<h') && !line.startsWith('<ul>')) {
        return `<p>${line}</p>`;
      }
      return line;
    }).join('');
    
    return processed;
  };
  
  export default renderMarkdown;