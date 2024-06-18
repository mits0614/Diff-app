import React from 'react';

const problems = {
  lec01: ['lec01-1', 'lec01-2', 'lec01-3', 'lec01-4', 'lec01-5', 'lec01-6', 'lec01-7', 'lec01-8', 'lec01-9', 'lec01-10','lec01-11'],
  lec02: ['lec02-1', 'lec02-2', 'lec02-3', 'lec02-4', 'lec02-5', 'lec02-6', 'lec02-7', 'lec02-8', 'lec02-9', 'lec02-10','lec02-11','lec02-12','lec02-13'],
  lec03: ['lec03-1', 'lec03-2', 'lec03-3', 'lec03-4', 'lec03-5', 'lec03-6', 'lec03-7', 'lec03-8', 'lec03-9', 'lec03-10','lec03-11','onion.inp'],
　homework: ['homework1','homework2','homework3','homework-final'],
};

const ProblemSelector = ({ selectedMajor, setSelectedMajor, selectedMinor, setSelectedMinor }) => {
  return (
    <div>
      <select value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)}>
        {Object.keys(problems).map((major) => (
          <option key={major} value={major}>
            {major}
          </option>
        ))}
      </select>
      <select value={selectedMinor} onChange={(e) => setSelectedMinor(e.target.value)}>
        {problems[selectedMajor].map((minor) => (
          <option key={minor} value={minor}>
            {minor}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProblemSelector;
