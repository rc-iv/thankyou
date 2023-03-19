import React, { useState } from 'react';

const SavedCards = ({ savedCards }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const toggleCard = (index) => {
    if (selectedCard === index) {
      setSelectedCard(null);
    } else {
      setSelectedCard(index);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Saved Cards</h2>
      {savedCards.map((card, index) => (
        <div
          key={index}
          className={`cursor-pointer border border-gray-300 rounded p-4 mb-4 bg-gray-100 hover:bg-gray-200 transition-colors ${
            index === selectedCard ? 'bg-gray-200' : ''
          }`}
          onClick={() => toggleCard(index)}
        >
          <div className="font-semibold">
            <p>{card.giverName}</p>
          </div>
          {index === selectedCard && (
            <div className="mt-4">
              <p className="whitespace-pre-wrap">{card.responseText.trim()}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SavedCards;
