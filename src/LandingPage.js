import React, {useState, useRef} from 'react';
import Modal from 'react-modal';
import GiftInput from '../src/components/GiftInput/GiftInput';
import styles from './LandingPage.module.css';
import axios from 'axios';
import OccasionDropdown from './OccasionDropdown';
import ResponseCard from '../src/components/ResponseCard/ResponseCard';
import SavedCards from '../src/components/SavedCards/SavedCards';

Modal.setAppElement('#root');

const LandingPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [userName, setUserName] = useState('');
    const [occasion, setOccasion] = useState('baby shower');
    const [babyName, setBabyName] = useState('');
    const [giverName, setGiverName] = useState('');
    const [numOfGifts, setNumOfGifts] = useState(1);
    const [gifts, setGifts] = useState(Array(numOfGifts).fill(''));
    const [additionalInfo, setAdditionalInfo] = useState('');

    const [responseText, setResponseText] = useState('');
    const [showResponseCard, setShowResponseCard] = useState(false);

    const [loading, setLoading] = useState(false);
    const [showRetryButton, setShowRetryButton] = useState(false);
    const timeoutRef = useRef(null);

    const [savedCards, setSavedCards] = useState([]);
    const [hasSavedCards, setHasSavedCards] = useState(false);


    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleNumOfGiftsChange = (e) => {
        setNumOfGifts(e.target.value);
    };


    const generateThankYouCards = async () => {
        const giverName = document.getElementById('giverName').value;
        let prompt = `Generate a thank you card for a ${occasion} to send to ${giverName} who has given ${numOfGifts} gift(s) to ${userName}:\n\n`;

        closeModal();
        setShowResponseCard(true);
        setLoading(true);
        setShowRetryButton(false);

        timeoutRef.current = setTimeout(() => {
            setLoading(false);
            setShowRetryButton(true);
        }, 30000);

        for (let i = 0; i < numOfGifts; i++) {
            prompt += `Gift ${i + 1}: ${gifts[i]}\n`;
        }

        if (occasion === 'baby shower') {
            prompt += `Baby's Name: ${babyName}\n\n`;
        }

        prompt += `\nAdditional Information: ${additionalInfo}`;

        console.log(prompt);
        try {
            const response = await axios.post(
                'https://82wpkuvkeh.execute-api.us-east-1.amazonaws.com',
                null,
                {params: {prompt}}
            );
            console.log(response.data);
            setResponseText(response.data);
            clearTimeout(timeoutRef.current);
        } catch (error) {
            console.error('Error fetching data from OpenAI API:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOccasionChange = (newOccasion, newBabyName, newGiverName) => {
        setOccasion(newOccasion);
        setBabyName(newBabyName);
        setGiverName(newGiverName);
    };

    const saveCard = () => {
        setShowResponseCard(false);
        setSavedCards((prevSavedCards) => [
            ...prevSavedCards,
            {
                userName,
                occasion,
                babyName,
                numOfGifts,
                gifts,
                additionalInfo,
                giverName,
                responseText,
            },
        ]);
        setHasSavedCards(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {showResponseCard && (
                <ResponseCard
                    text={responseText}
                    loading={loading}
                    openModal={openModal}
                    closeCard={() => setShowResponseCard(false)}
                    showRetryButton={showRetryButton}
                    onRetry={generateThankYouCards}
                    saveCard={saveCard}
                />
            )}
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
                <h1 className="text-3xl font-bold text-center">Thank You Card Generator</h1>
                <p className="text-center">Easily create personalized thank you cards using AI.</p>
                <button
                    className="w-full px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    onClick={openModal}
                >
                    Start Generating
                </button>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Gift Input Modal"
                    className="relative w-auto p-6 mx-auto mt-10 bg-white rounded shadow-xl outline-none max-w-md"
                    overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className={styles['modal-content']}>
                        <div className="w-full">
                            <h2 className="text-2xl font-bold mb-4">Enter Gift Details</h2>
                            <div className="mb-4">
                                <label htmlFor="userName" className="block mb-2">
                                    Your Name:
                                </label>
                                <input
                                    id="userName"
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <OccasionDropdown
                                onOccasionChange={handleOccasionChange}
                                babyName={babyName}
                                setBabyName={setBabyName}
                                giverName={giverName} // Pass giverName as a prop
                                setGiverName={setGiverName} // Pass setGiverName as a prop
                            />
                            <div className="mb-4">
                                <label htmlFor="giverName" className="block mb-2">
                                    From:
                                </label>
                                <input
                                    id="giverName"
                                    type="text"
                                    value={giverName} // Add value attribute
                                    onChange={(e) => setGiverName(e.target.value)} // Add onChange attribute
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                    placeholder="Enter who the gift(s) are from"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="numOfGifts" className="block mb-2">
                                    Number of gifts:
                                </label>
                                <select
                                    id="numOfGifts"
                                    value={numOfGifts}
                                    onChange={handleNumOfGiftsChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                >
                                    {[...Array(10).keys()].map((i) => (
                                        <option key={i} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <GiftInput numOfGifts={numOfGifts} gifts={gifts} setGifts={setGifts}/>
                            <div className="mb-4">
                                <label htmlFor="additionalInfo" className="block mb-2">
                                    Additional Information:
                                </label>
                                <textarea
                                    id="additionalInfo"
                                    value={additionalInfo}
                                    onChange={(e) => setAdditionalInfo(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                    placeholder="Enter any additional information to personalize the thank you"
                                    rows={3}
                                />
                            </div>

                            {/* Add your submit button and other controls here */}
                            <button
                                className="w-full mt-4 px-3 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                                onClick={generateThankYouCards}
                            >
                                Generate Thank You Card
                            </button>
                            <button
                                className="w-full mt-2 px-3 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
            {hasSavedCards && <SavedCards savedCards={savedCards} />}
        </div>
    );
};


export default LandingPage;
