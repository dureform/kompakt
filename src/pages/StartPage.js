import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Spinner } from 'react-bootstrap';
import { ToastContext } from '../contexts/ToastContext';

function StartPage() {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLoading(false);
        navigate('/editor', { state: { src: reader.result, fileName: file.name } });
      };
      reader.onerror = () => {
        setLoading(false);
        addToast('Error', 'Failed to read the file.', 'danger');
      };
      reader.readAsDataURL(file);
    } else {
      addToast('Invalid File', 'Please select a valid image file.', 'warning');
    }
  };

  return (
    <Container className="start-page-container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="start-page-logo mb-4">Kompakt</h1>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <label htmlFor="file-upload" className="btn start-page-button btn-lg">
            Open File
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <p className="start-page-subtext">( jpg, png, wav, csv, pdf... )</p>
        </>
      )}
    </Container>
  );
}

export default StartPage;