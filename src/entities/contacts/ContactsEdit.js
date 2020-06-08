import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as PropTypes from "prop-types";
import React, {useRef, useState} from "react";

export function ContactEdit({onHide, onSave, selectedContact}) {
    const [firstName, setFirstName] = useState(selectedContact.firstName || '');
    const [lastName, setLastName] = useState(selectedContact.lastName || '');
    const [email, setEmail] = useState(selectedContact.email || '');
    const [phone, setPhone] = useState(selectedContact.phone || '');

    const [errors, setErrors] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Photo input
    const [photo, setPhoto] = useState(selectedContact.photo || null);
    const photoInput = useRef();
    const updatePhoto = () => {
        const file = photoInput.current.files
            && photoInput.current.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPhoto(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const save = event => {
        event.preventDefault();
        setIsSaving(true);
        onSave({
            ...selectedContact,
            firstName,
            lastName,
            email,
            phone,
            photo
        })
            .then(_ => {
                onHide();
            })
            .catch(errors => {
                setErrors(errors);
                setIsSaving(false);
            });
    };

    return <Modal show={true} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>{selectedContact.id === undefined ? 'New Contact' : 'Edit Contact'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={save}>
                <div className="form-group">
                    <label htmlFor="editContactField1">First Name</label>
                    <input type="text" className="form-control" id="editContactField1"
                           value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    {showError(errors, 'firstName')}
                </div>
                <div className="form-group">
                    <label htmlFor="editContactField2">Last Name</label>
                    <input type="text" className="form-control" id="editContactField2"
                           value={lastName} onChange={e => setLastName(e.target.value)}/>
                    {showError(errors, 'lastName')}
                </div>
                <div className="form-group">
                    <label htmlFor="editContactField3">Email</label>
                    <input type="email" className="form-control" id="editContactField3"
                           placeholder="name@example.com"
                           value={email} onChange={e => setEmail(e.target.value)}/>
                    {showError(errors, 'email')}
                </div>
                <div className="form-group">
                    <label htmlFor="editContactField4">Phone</label>
                    <input type="text" className="form-control" id="editContactField4"
                           placeholder="XXX-XXX-XXXX"
                           value={phone} onChange={e => setPhone(e.target.value)}/>
                    {showError(errors, 'phone')}
                </div>

                {photo && <img src={photo} alt="User photo" style={{height: '100px'}}/>}
                <div className="form-group">
                    <label htmlFor="editContactField0">Photo</label>
                    <div>
                        <input type="file" id="editContactField0" ref={photoInput} onChange={updatePhoto}/>
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide} disabled={isSaving}>
                Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={save} disabled={isSaving}>
                Save
            </Button>
        </Modal.Footer>
    </Modal>;
}

ContactEdit.propTypes = {
    onHide: PropTypes.func,
    onSave: PropTypes.func,
};

function showError(errors, fieldName) {
    return errors && errors[fieldName] && (<div className="text-danger">{errors && errors[fieldName]}</div>);
}
