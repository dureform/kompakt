import React, { useState, useCallback, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { getCroppedImg } from '../utils/cropUtils';
import { ToastContext } from '../contexts/ToastContext';
import { FaX } from 'react-icons/fa6';

function EditorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { src, fileName } = location.state || {};
  const { addToast } = useContext(ToastContext);

  const [selectedTool, setSelectedTool] = useState('Crop');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleAspectRatioChange = (ratio) => {
    setAspect(getAspectRatio(ratio));
  };

  const getAspectRatio = (ratio) => {
    switch (ratio) {
      case '1:1':
        return 1;
      case '4:3':
        return 4 / 3;
      case '16:9':
        return 16 / 9;
      default:
        return 1;
    }
  };

  const handleExport = async (format) => {
    try {
      const croppedImage = await getCroppedImg(src, croppedAreaPixels);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(croppedImage);
      link.download = `cropped_${fileName.split('.')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('Success', `Image exported as ${format.toUpperCase()}`, 'success');
    } catch (error) {
      console.error('Export failed:', error);
      addToast('Error', 'Failed to export image', 'error');
    }
  };

  if (!src) {
    navigate('/');
    return null;
  }

  return (
    <Container fluid className="min-vh-100 d-flex flex-column p-4" style={{ backgroundColor: '#222222', color: '#9c9c9c' }}>
      <Row className="header py-3">
        <Col xs={4}>
          <h1 className="h4 mb-0">Kompakt</h1>
        </Col>
        <Col xs={4} className="d-flex justify-content-center">
          <div className="tools">
            {['Crop', 'Resize', 'Compress'].map((tool) => (
              <span
                key={tool}
                className={`tool ${selectedTool === tool ? 'active' : ''}`}
                onClick={() => setSelectedTool(tool)}
              >
                {tool}
              </span>
            ))}
          </div>
        </Col>
        <Col xs={4} className="text-end">
          <span className="close" onClick={() => navigate('/')}>
            Close <FaX />
          </span>
        </Col>
      </Row>
      <Row className="main-content flex-grow-1 justify-content-center">
        <Col xs={12} md={10} lg={8} className="d-flex flex-column">
          <div className="image-editor-container">
            <div className="image-container" style={{ height: '400px', position: 'relative' }}>
              <Cropper
                image={src}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="editor-controls d-flex justify-content-between align-items-center">
              <div className="ratio-group">
                {['1:1', '4:3', '16:9'].map((ratio) => (
                  <Form.Check
                    key={ratio}
                    type="radio"
                    id={`ratio-${ratio}`}
                    label={<span className="ratio-label">{ratio}</span>}
                    name="aspectRatio"
                    checked={aspect === getAspectRatio(ratio)}
                    onChange={() => handleAspectRatioChange(ratio)}
                    inline
                  />
                ))}
              </div>
              <div className="export-buttons">
                <Button variant="link" className="export-jpg me-2 p-0" onClick={() => handleExport('jpg')}>
                  Export .jpg
                </Button>
                <Button variant="link" className="export-png p-0" onClick={() => handleExport('png')}>
                  Export .png
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EditorPage;