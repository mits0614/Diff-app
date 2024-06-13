// DiffViewerComponent.js
import React, { useState } from 'react';

// Monaco Editorのコンポーネントをインポート
import MonacoEditor from 'react-monaco-editor';

const DiffViewerComponent = () => {
  // ステートフックを使用してエディタの値を管理
  const [originalText, setOriginalText] = useState('');
  const [modifiedText, setModifiedText] = useState('');

  // Monaco Editorのオプション
  const options = {
    selectOnLineNumbers: true,
    readOnly: false
  };

  return (
    <div>
      <h1>Diff Viewer</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {/* オリジナルテキストエディタ */}
        <MonacoEditor
          width="45%"
          height="600"
          language="javascript"
          theme="vs-dark"
          value={originalText}
          options={options}
          onChange={(newValue) => setOriginalText(newValue)}
        />
        {/* 修正後テキストエディタ */}
        <MonacoEditor
          width="45%"
          height="600"
          language="javascript"
          theme="vs-dark"
          value={modifiedText}
          options={options}
          onChange={(newValue) => setModifiedText(newValue)}
        />
      </div>
    </div>
  );
};

export default DiffViewerComponent;
