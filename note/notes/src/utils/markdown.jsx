import React from 'react';
import { MDXEditor } from '@mdxeditor/editor';

// Import only the specific plugins we need
import {
  headingsPlugin,
  markdownShortcutPlugin,
  BoldItalicButton,
  Separator,
  UndoRedoButton,
  toolbarPlugin,
  ListsButton,
  CodeButton,
  InsertCodeBlock,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin
} from '@mdxeditor/editor';

// Import the CSS
import '@mdxeditor/editor/style.css';

// Export MDXEditor wrapper component for editing with limited plugins
export const MarkdownEditor = ({ content, onChange }) => {
  return (
    <MDXEditor
      markdown={content}
      onChange={onChange}
      contentEditableClassName="note-mdx-editor"
      plugins={[
        // Include only the plugins we need
        headingsPlugin({ allowedHeadingLevels: [1] }), // Only h1 as requested
        markdownShortcutPlugin(),
        codeBlockPlugin({
          defaultCodeBlockLanguage: 'js',
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedoButton />
              <Separator />
              <BoldItalicButton bold={true} italic={false} /> {/* Bold button */}
              <BoldItalicButton bold={false} italic={true} /> {/* Italic button */}
              <CodeButton /> {/* Inline code button */}
              <Separator />
              <ListsButton />
              <Separator />
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor.getCodeBlockRange() !== null,
                    contents: () => <ChangeCodeMirrorLanguage />
                  },
                  {
                    fallback: () => (
                      <>
                        <InsertCodeBlock />
                      </>
                    )
                  }
                ]}
              />
            </>
          )
        })
      ]}
    />
  );
};

// Function to render markdown content for viewing
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
  
  // Code line
  processed = processed.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Code blocks
  processed = processed.replace(/```(.+?)\n([\s\S]*?)```/g, (match, language, code) => {
    return `<pre><code class="language-${language}">${code}</code></pre>`;
  });
  
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
      !line.startsWith('<li>') &&
      !line.startsWith('<pre>') &&
      !line.startsWith('<code>')
    ) {
      processed += `<p>${line}</p>`;
    } else {
      processed += line;
    }
  }
  
  return processed;
};

export default renderMarkdown;