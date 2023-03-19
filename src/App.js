import React from 'react';
import LandingPage from './LandingPage';
import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
