import React from 'react';

const FileSaveButton = ({ text }) => {
  const handleFileSave = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'file.inp';
    link.click();
  };

  return (
    <button onClick={handleFileSave}>Save File</button>
  );
};

export default FileSaveButton;
