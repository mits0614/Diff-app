import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import phitsLanguage from './phits-language';

const MonacoPHITSEditor = ({ text, setText, theme }) => {
  const editorRef = useRef(null);
  const monacoInstanceRef = useRef(null);
  const [phitsDocs, setPhitsDocs] = useState(null);
  const hoverDisposables = useRef([]);

  useEffect(() => {
    const loadPhitsDocs = async () => {
      const response = await fetch('/data/phits_document_all.json');
      const data = await response.json();
      setPhitsDocs(data);
    };
    loadPhitsDocs();
  }, []);

  const registerHoverProvider = () => {
    // Clear previous hover providers
    hoverDisposables.current.forEach(disposable => disposable.dispose());
    hoverDisposables.current = [];

    // Register new hover provider
    const hoverProvider = monaco.languages.registerHoverProvider('phits', {
      provideHover: function (model, position) {
        const word = model.getWordAtPosition(position);
        if (word) {
          const keywordDoc = phitsDocs.keywords.find(k => new RegExp(`\\b${k.keyword.replace(/\s+/g, '\\s+')}\\b`, 'i').test(word.word));
          if (keywordDoc) {
            return {
              range: new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn),
              contents: [{ value: `**${word.word}**: ${keywordDoc.description}` }]
            };
          }
          const patternDoc = phitsDocs.patterns.find(p => new RegExp(`\\b${p.pattern.replace(/\s+/g, '\\s+')}\\b`, 'i').test(word.word));
          if (patternDoc) {
            return {
              range: new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn),
              contents: [{ value: `**${word.word}**: ${patternDoc.description}` }]
            };
          }
        }
        return null;
      }
    });

    hoverDisposables.current.push(hoverProvider);
  };

  useEffect(() => {
    if (editorRef.current && phitsDocs) {
      if (!monacoInstanceRef.current) {
        const editor = monaco.editor.create(editorRef.current, {
          value: text,
          language: 'phits',
          theme: theme === 'dark' ? 'vs-dark' : 'vs-light'
        });

        monacoInstanceRef.current = editor;

        editor.onDidChangeModelContent(() => {
          setText(editor.getValue());
        });

        monaco.languages.register({ id: 'phits' });
        monaco.languages.setMonarchTokensProvider('phits', phitsLanguage);

        monaco.languages.setLanguageConfiguration('phits', {
          comments: {
            lineComment: '#',
            blockComment: ['/*', '*/']
          },
          brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')']
          ],
          autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"' }
          ]
        });

        registerHoverProvider();

        // Mouse down event for displaying keyword descriptions in alert
        editor.onMouseDown((e) => {
          const position = e.target.position;
          if (position) {
            const word = editor.getModel().getWordAtPosition(position);
            if (word) {
              const keywordDoc = phitsDocs.keywords.find(k => new RegExp(`\\b${k.keyword.replace(/\s+/g, '\\s+')}\\b`, 'i').test(word.word));
              if (keywordDoc) {
                alert(`**${word.word}**: ${keywordDoc.description}`);
              }
              const patternDoc = phitsDocs.patterns.find(p => new RegExp(`\\b${p.pattern.replace(/\s+/g, '\\s+')}\\b`, 'i').test(word.word));
              if (patternDoc) {
                alert(`**${word.word}**: ${patternDoc.description}`);
              }
            }
          }
        });

        return () => {
          if (monacoInstanceRef.current) {
            monacoInstanceRef.current.dispose();
            monacoInstanceRef.current = null;
          }
        };
      } else {
        monacoInstanceRef.current.setValue(text);
        monaco.editor.setModelLanguage(monacoInstanceRef.current.getModel(), 'phits');
      }
    }
  }, [editorRef, text, phitsDocs, theme, setText]);

  useEffect(() => {
    if (monacoInstanceRef.current) {
      monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs-light');
      registerHoverProvider(); // Register hover provider again after theme change
    }
  }, [theme]);

  return (
    <div ref={editorRef} className="editor-container"></div>
  );
};

export default MonacoPHITSEditor;
