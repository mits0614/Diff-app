import React, { useEffect, useRef } from 'react';
import * as Webdiff from 'webdiff';

// WebdiffViewerコンポーネント定義
const WebdiffViewer = ({ leftText, rightText }) => {
  const diffContainer = useRef(null);

  useEffect(() => {
    if (diffContainer.current) {
      // Webdiffの設定と初期化
      Webdiff.Diff2HtmlUI({
        diff: Webdiff.createPatch('diff', leftText, rightText),
        outputFormat: 'side-by-side',
        highlight: true,
        container: diffContainer.current
      });
    }
  }, [leftText, rightText]);

  return <div ref={diffContainer} className="webdiff-container" />;
};

export default WebdiffViewer;
