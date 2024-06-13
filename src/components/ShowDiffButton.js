import React, { useState } from 'react';
import { diffLines } from 'diff';

const ShowDiffButton = ({ text1, setText2 }) => {
  const [diffFile, setDiffFile] = useState('');

  const handleDiffFileOpen = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDiffFile(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const showDiff = () => {
    const diff = diffLines(text1, diffFile);
    const diffText = diff.map((part) => {
      const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
      return `<span style="color:${color}">${part.value}</span>`;
    }).join('');
    setText2(diffText);
  };

  return (
    <div>
      <input
        type="file"
        accept=".inp"
        onChange={handleDiffFileOpen}
        style={{ display: 'none' }}
        id="diff-file-open"
      />
      <label htmlFor="diff-file-open">
        <button>Show Diff</button>
      </label>
      <button onClick={showDiff}>Compare</button>
    </div>
  );
};

export default ShowDiffButton;
