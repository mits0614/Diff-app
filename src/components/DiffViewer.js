import React from 'react';
import DiffViewerComponent from './DiffViewerComponent';

const DiffViewer = ({ oldValue, newValue }) => {
  return (
    <div className="diff-viewer">
      <DiffViewerComponent oldValue={oldValue} newValue={newValue} />
    </div>
  );
};

export default DiffViewer;
