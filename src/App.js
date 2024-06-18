import React, { useState, useEffect } from 'react';
import './App.css';
import MonacoPHITSEditor from './components/MonacoPHITSEditor';
import DiffViewerComponent from './components/DiffViewerComponent';
import ProblemSelector from './components/ProblemSelector';
import FileOpenButton from './components/FileOpenButton';
import FileSaveButton from './components/FileSaveButton';
import Glossary from './components/Glossary';

const App = () => {
  const [studentText, setStudentText] = useState('');
  const [correctText, setCorrectText] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('lec01');
  const [selectedMinor, setSelectedMinor] = useState('lec01-1');
  const [activeTab, setActiveTab] = useState('editor');
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    fetch(`/data/${selectedMajor}/${selectedMinor}.inp`)
      .then((response) => response.text())
      .then((data) => {
        setCorrectText(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error loading correct text:', error));
  }, [selectedMajor, selectedMinor]);

  useEffect(() => {
    if (activeTab === 'editor') {
      setLoading(false);
    }
  }, [activeTab]);

  const handleFileChange = (newText) => {
    setStudentText(newText);
    if (activeTab !== 'editor') {
      setActiveTab('editor');
    }
  };

  return (
    <div className={`app-container ${theme}`}>
      <div className="controls">
        <ProblemSelector
          selectedMajor={selectedMajor}
          setSelectedMajor={setSelectedMajor}
          selectedMinor={selectedMinor}
          setSelectedMinor={setSelectedMinor}
        />
        <FileOpenButton setText={handleFileChange} />
        <FileSaveButton text={studentText} />
        <div className="tab-buttons">
          <button 
            onClick={() => setActiveTab('editor')} 
            className={activeTab === 'editor' ? 'active' : ''}
          >
            Editor
          </button>
          <button 
            onClick={() => setActiveTab('diff')} 
            className={activeTab === 'diff' ? 'active' : ''}
          >
            Diff Viewer
          </button>
          <button 
            onClick={() => setActiveTab('glossary')} 
            className={activeTab === 'glossary' ? 'active' : ''}
          >
            単語解説
          </button>
        </div>
        <div className="theme-switcher">
          <button onClick={() => setTheme('light')}>Light Mode</button>
          <button onClick={() => setTheme('dark')}>Dark Mode</button>
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 'editor' && !loading && (
          <div className="editor">
            <MonacoPHITSEditor
              text={studentText}
              setText={setStudentText}
              theme={theme}
            />
          </div>
        )}
        {activeTab === 'diff' && (
          <div className="diff-viewer">
            <div className="file-titles">
              <div className="file-title">入力ファイル</div>
              <div className="file-title">正答ファイル</div>
            </div>
            <DiffViewerComponent
              oldValue={correctText}
              newValue={studentText}
              theme={theme}
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
