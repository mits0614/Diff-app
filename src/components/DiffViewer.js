import React from 'react';
import { DiffViewer } from 'react-diff-viewer';

// DiffViewerComponentコンポーネントの定義
const DiffViewerComponent = ({ studentText, correctText }) => {
    return (
        <DiffViewer
            oldValue={correctText} // 正解のテキストを左側に表示
            newValue={studentText} // 学生のテキストを右側に表示
            splitView={true} // サイドバイサイドの表示
            hideLineNumbers={true}
            showDiffOnly={true}
        />
    );
};

// DiffViewerComponentをエクスポート
export default DiffViewerComponent;
