import React, { useRef } from 'react';

const FileOpenButton = ({ setText }) => {
  const fileInputRef = useRef(null);

  const handleFileOpen = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".inp"
        onChange={handleFileOpen}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <button onClick={handleClick}>Open File</button>
    </div>
  );
};

export default FileOpenButton;
