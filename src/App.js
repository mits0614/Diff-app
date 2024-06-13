import React, { useState, useEffect } from 'react';
import './App.css';
import MonacoEditor from './components/MonacoEditor';
import DiffViewerComponent from './components/DiffViewer';
import ProblemSelector from './components/ProblemSelector';
import FileOpenButton from './components/FileOpenButton';
import FileSaveButton from './components/FileSaveButton';
import Glossary from './components/Glossary';

const App = () => {
  const [studentText, setStudentText] = useState('');
  const [correctText, setCorrectText] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('lec01');
  const [selectedMinor, setSelectedMinor] = useState('lec01-1');
  const [activeTab, setActiveTab] = useState('editor'); // 現在アクティブなタブを保持する状態

  useEffect(() => {
    fetch(`/data/${selectedMajor}/${selectedMinor}.inp`)
      .then((response) => response.text())
      .then((data) => setCorrectText(data))
      .catch((error) => console.error('Error loading correct text:', error));
  }, [selectedMajor, selectedMinor]);

  return (
    <div className="app-container">
      <div className="controls">
        <ProblemSelector
          selectedMajor={selectedMajor}
          setSelectedMajor={setSelectedMajor}
          selectedMinor={selectedMinor}
          setSelectedMinor={setSelectedMinor}
        />
        <FileOpenButton setText={setStudentText} />
        <FileSaveButton text={studentText} />
        {/* タブボタンを追加 */}
        <button onClick={() => setActiveTab('editor')}>Editor</button>
        <button onClick={() => setActiveTab('diff')}>Diff Viewer</button>
        <button onClick={() => setActiveTab('glossary')}>Glossary</button>
      </div>
      <div className="tab-content">
        {activeTab === 'editor' && (
          <div className="editor">
            <MonacoEditor
              text={studentText}
              setText={setStudentText}
            />
          </div>
        )}
        {activeTab === 'diff' && (
          <div className="diff-viewer">
            <DiffViewerComponent
              oldValue={correctText}
              newValue={studentText}
            />
          </div>
        )}
        {activeTab === 'glossary' && (
          <div className="glossary">
            <Glossary />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
