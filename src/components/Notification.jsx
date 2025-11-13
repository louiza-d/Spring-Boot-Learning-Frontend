import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Notification = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  return (
    <Alert variant={type} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
};

export default Notification;
