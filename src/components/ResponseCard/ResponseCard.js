import React from 'react';
import styles from './ResponseCard.module.css';

const ResponseCard = ({text, loading, closeCard, openModal, showRetryButton, onRetry, saveCard, cardType}) => {

    let referralLink = null;
    if (cardType === 'baby shower') {
        referralLink = (
            <a href="https://www.zazzle.com/rustic_cub_bear_baby_shower_thank_you_card-256010692354344539?rf=238277349690894412" target="_blank" rel="noreferrer">
                <button
                    className={`${styles['save-button']} ${styles['edit-button']}`}
                >
                    Buy thank you cards on Zazzle!
                </button>
            </a>
        );
    }else if (cardType === 'wedding') {
        referralLink = (
            <a href="https://www.zazzle.com/minimalist_simple_script_with_heart_wedding_photo_thank_you_card-256953486324783391?rf=238277349690894412" target="_blank" rel="noreferrer">
                <button
                    className={`${styles['save-button']} ${styles['edit-button']}`}
                >
                    Buy thank you cards on Zazzle!
                </button>
            </a>
        );
    }else if (cardType === 'birthday') {
        referralLink = (
            <a href="https://www.zazzle.com/modern_watercolor_coordinate_green_thank_you_card-256099105345099076?rf=238277349690894412" target="_blank" rel="noreferrer">
                <button
                    className={`${styles['save-button']} ${styles['edit-button']}`}
                >
                    Buy thank you cards on Zazzle!
                </button>
            </a>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-2xl p-8 space-y-4 bg-white rounded shadow-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold mb-4 text-center">Thank You Card</h2>
                    <button className={styles['close-button']} onClick={closeCard}>
                        X
                    </button>
                </div>
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className="loader"></div>
                    </div>
                ) : showRetryButton ? (
                    <button
                        className="px-3 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                        onClick={onRetry}
                    >
                        Retry
                    </button>
                ) : (
                    <p className={`${styles['response-text']} whitespace-pre-wrap`}>
                        {text.trim()}
                    </p>
                )}
                <div className="flex justify-center mt-4">
                    <button
                        className={`${styles['edit-button']} px-8 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600`}
                        onClick={openModal}>
                        Edit
                    </button>
                    <button
                        className={`${styles['save-button']} ${styles['edit-button']}`}
                        onClick={saveCard}
                    >
                        Save
                    </button>
                    {referralLink}
                </div>
            </div>
        </div>
    );
};

export default ResponseCard;
