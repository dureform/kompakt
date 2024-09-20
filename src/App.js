// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import EditorPage from './pages/EditorPage';
import { ToastProvider } from './contexts/ToastContext';
import ToastContainerComponent from './components/ToastContainer';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </Router>
      <ToastContainerComponent />
    </ToastProvider>
  );
}

export default App;
