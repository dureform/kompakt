// src/components/ToastContainer.js
import React, { useContext } from 'react';
import { Toast, ToastContainer as BootstrapToastContainer } from 'react-bootstrap';
import { ToastContext } from '../contexts/ToastContext';

function ToastContainerComponent() {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <BootstrapToastContainer position="top-end" className="p-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          onClose={() => removeToast(toast.id)}
          bg={toast.variant}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">{toast.title}</strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      ))}
    </BootstrapToastContainer>
  );
}

export default ToastContainerComponent;
