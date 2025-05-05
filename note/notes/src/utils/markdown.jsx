import React from 'react';
import { MDXEditor } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css'

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

export const MarkdownEditor = ({ content, onChange}) => {
  return (
    <MDXEditor 
    markdown={content}
    onChange={onChange}
    contentEditableClassName='note-mdx-editor'
    plugins={[headingsPlugin({ allowed})]}
  )
}