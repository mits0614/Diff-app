import React, { useState, useEffect } from 'react';

// モーダルコンポーネントの作成
const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <pre>{content}</pre>
      </div>
    </div>
  );
};

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [data, setData] = useState(null); // データ全体を保持するためのステート

  useEffect(() => {
    fetch('/phits_document_all.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error loading glossary:', error));
  }, []);

  const handleSearch = () => {
    if (!data) return;

    const keywordResults = data.keywords.filter(item => 
      item.keyword.includes(searchTerm)
    ).slice(0, 3);
    const sourceResults = data.sources.filter(item => 
      item.source.includes(searchTerm)
    ).slice(0, 3);
    const sourceTypeResults = data.sourceTypes.filter(item => 
      item['s-type'].toString().includes(searchTerm)
    ).slice(0, 3);

    const combinedResults = [
      ...keywordResults.map(item => ({ title: item.keyword, description: item.description })),
      ...sourceResults.map(item => ({ title: item.source, description: item.description })),
      ...sourceTypeResults.map(item => ({
        title: `s-type ${item['s-type']}`,
        description: item.description,
        parameters: item.parameters
      }))
    ];

    setResults(combinedResults);
  };

  const handleItemClick = (description, parameters) => {
    let content = description;
    if (parameters) {
      content += '\nParameters:\n' + JSON.stringify(parameters, null, 2);
    }
    setModalContent(content);
    setIsOpen(true);
  };

  return (
    <div>
      <h1>Glossary</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {Array.isArray(results) && results.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item.description, item.parameters)}>
            {item.title}
          </li>
        ))}
      </ul>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} content={modalContent} />
    </div>
  );
};

export default Glossary;
