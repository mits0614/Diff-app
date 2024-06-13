import React from 'react';
import { DiffEditor } from '@monaco-editor/react';

const DiffViewerComponent = ({ oldValue, newValue }) => {
  return (
    <DiffEditor
      height="600px"
      language="javascript"
      original={oldValue}
      modified={newValue}
      theme="vs-dark"
    />
  );
};

export default DiffViewerComponent;
