import React, { useState, useEffect } from 'react';

const categories = [
  { name: 'PHITS ドキュメント 1', file: 'phits_document.json', key: 'keywords' },
  { name: 'PHITS ドキュメント 2', file: 'phits_document2.json', key: 'keywords' },
  { name: 'ソースドキュメント', file: 'source_document.json', key: 'terms' },
  { name: 'ソースタイプ', file: 'sourceTypes.json', key: 'types' }
];

const Glossary = () => {
  const [glossaryData, setGlossaryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].file);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGlossaryData = async () => {
      try {
        setLoading(true);
        const category = categories.find(cat => cat.file === selectedCategory);
        const response = await fetch(`/data/${category.file}`);
        const data = await response.json();
        const key = category.key;
        
        if (Array.isArray(data[key])) {
          setGlossaryData(data[key]);
        } else {
          console.error('Invalid data format:', data);
          setGlossaryData([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading glossary data:', error);
        setGlossaryData([]);
        setLoading(false);
      }
    };
    loadGlossaryData();
  }, [selectedCategory]);

  return (
    <div className="glossary-container">
      <h2>Glossary</h2>
      <div className="category-selector">
        {categories.map((category) => (
          <button
            key={category.file}
            onClick={() => setSelectedCategory(category.file)}
            className={selectedCategory === category.file ? 'active' : ''}
          >
            {category.name}
          </button>
        ))}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {glossaryData.map((entry, index) => (
            <li key={index}>
              <strong>{entry.keyword || entry.term || entry.type}</strong>: {entry.description || entry.definition}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Glossary;
