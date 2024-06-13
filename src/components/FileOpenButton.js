import React from 'react';

const FileOpenButton = ({ setText }) => {
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

  return (
    <div>
      <input type="file" onChange={handleFileOpen} />
    </div>
  );
};

export default FileOpenButton;
