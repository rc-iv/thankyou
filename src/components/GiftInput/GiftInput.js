import React from 'react';

const GiftInput = ({ numOfGifts, gifts, setGifts }) => {
  const renderGiftInputs = () => {
    const inputs = [];
    for (let i = 0; i < numOfGifts; i++) {
      inputs.push(
        <div key={i} className="mt-2">
          <label htmlFor={`gift${i + 1}`}>Gift {i + 1}:</label>
          <input
            id={`gift${i + 1}`}
            type="text"
            value={gifts[i]}
            onChange={(e) => {
              const newGifts = [...gifts];
              newGifts[i] = e.target.value;
              setGifts(newGifts);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
      );
    }
    return inputs;
  };

  return <div>{renderGiftInputs()}</div>;
};

export default GiftInput;
