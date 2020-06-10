import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ConfirmWindow({title, message, onHide, onConfirm, buttonSecondaryTitle, buttonPrimaryTitle, color}) {
    title = title || 'Delete';
    message = message || 'Are you sure you want to delete this item?';
    buttonSecondaryTitle = buttonSecondaryTitle || 'Cancel';
    buttonPrimaryTitle = buttonPrimaryTitle || 'Confirm';
    color = color || 'primary';

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
                    {buttonSecondaryTitle}
                </Button>
                <Button variant={color} onClick={onConfirm}>
                    {buttonPrimaryTitle}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmWindow;
