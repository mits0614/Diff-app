import React from 'react';
import phitsDocument from '../phits_document.json';
import phitsDocument2 from '../phits_document2.json';
import sourceDocument from '../source_document.json';
import sourceTypes from '../sourceTypes.json';

// Glossaryコンポーネントの定義
const Glossary = () => {
    return (
        <div>
            <h2>Glossary</h2>
            <pre>{JSON.stringify(phitsDocument, null, 2)}</pre>
            <pre>{JSON.stringify(phitsDocument2, null, 2)}</pre>
            <pre>{JSON.stringify(sourceDocument, null, 2)}</pre>
            <pre>{JSON.stringify(sourceTypes, null, 2)}</pre>
        </div>
    );
};

export default Glossary;
