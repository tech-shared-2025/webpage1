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
  
  // Lists - fix the list rendering
  const listItems = processed.match(/^- (.*?)$/gm);
  if (listItems) {
    let listHtml = '<ul>';
    listItems.forEach(item => {
      const content = item.replace(/^- /, '');
      listHtml += `<li>${content}</li>`;
    });
    listHtml += '</ul>';
    
    // Replace list items with the full list HTML
    processed = processed.replace(/^- (.*?)$/gm, '');
    processed = processed + listHtml;
  }
  
  // Paragraphs - only wrap text that isn't already in HTML tags
  const lines = processed.split('\n');
  processed = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    if (
      !line.startsWith('<h1>') && 
      !line.startsWith('<h2>') && 
      !line.startsWith('<h3>') && 
      !line.startsWith('<ul>') && 
      !line.startsWith('<li>')
    ) {
      processed += `<p>${line}</p>`;
    } else {
      processed += line;
    }
  }
  
  return processed;
};

export default renderMarkdown;