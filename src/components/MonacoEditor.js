import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

const MonacoEditor = ({ text, setText }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value: text,
        language: 'javascript',
        theme: 'vs-dark',
      });

      editor.onDidChangeModelContent((event) => {
        setText(editor.getValue());
      });

      return () => {
        editor.dispose();
      };
    }
  }, [text, setText]);

  return (
    <div
      ref={editorRef}
      style={{ width: '100%', height: '500px' }}
    />
  );
};

export default MonacoEditor;
