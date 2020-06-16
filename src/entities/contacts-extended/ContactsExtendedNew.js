import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

export function ContactExtendedNew({onHide, onSave, selectedContact}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [errors, setErrors] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const save = event => {
        event.preventDefault();
        setIsSaving(true);
        onSave({
            ...selectedContact,
            firstName,
            lastName,
            email,
            phone
        })
            .then(() => {
                onHide();
            })
            .catch(errors => {
                setErrors(errors);
                setIsSaving(false);
            });
    };

    return <Modal show={true} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>New Contact</Modal.Title>
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

function showError(errors, fieldName) {
    return errors && errors[fieldName] && (<div className="text-danger">{errors && errors[fieldName]}</div>);
}
