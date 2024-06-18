import React from 'react';
import { DiffEditor } from '@monaco-editor/react';

const DiffViewerComponent = ({ oldValue, newValue, theme }) => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
                <span>入力ファイル</span>
                <span>正答ファイル</span>
            </div>
            <DiffEditor
                original={newValue}
                modified={oldValue}
                language="plaintext"
                theme={theme === 'dark' ? 'vs-dark' : 'vs-light'} // テーマを設定
                height="90vh"
                options={{
                    renderSideBySide: true
                }}
            />
        </div>
    );
};

export default DiffViewerComponent;
