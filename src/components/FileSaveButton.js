import React from 'react';

const FileSaveButton = ({ text }) => {
  const handleFileSave = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'output.inp';
    a.click();
  };

  return (
    <button onClick={handleFileSave}>Save File</button>
  );
};

export default FileSaveButton;
