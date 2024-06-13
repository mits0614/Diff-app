import React from 'react';
import { Editor } from '@monaco-editor/react';

const MonacoEditor = ({ text, setText }) => {
  return (
    <Editor
      height="600px"
      language="javascript"
      value={text}
      onChange={(value) => setText(value)}
      theme="vs-dark"
    />
  );
};

export default MonacoEditor;
