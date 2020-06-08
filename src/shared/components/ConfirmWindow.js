import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ConfirmWindow({title, message, onHide, onDelete}) {
    title = title || 'Delete';
    message = message || 'Are you sure you want to delete this item?';

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmWindow;
