import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";

export function ContactExtendedNoteEdit({onHide, onSave, selectedItem, clientExtendedId}) {
    const [text, setText] = useState(selectedItem.text || '');
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setError] = useState({});

    const save = event => {
        event.preventDefault();
        setIsSaving(true);
        onSave({
            ...selectedItem,
            clientExtendedId,
            text,
        })
            .then(() => {
                onHide();
            })
            .catch(errors => {
                setIsSaving(false);
            });
    };

    const onTextChange = (e) => {
        const text = e.target.value;
        setError({...errors, text: text.trim().length ? '' : "Shouldn't be empty"});
        setText(text);
    };

    return <Modal show={true} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>{selectedItem.id ? 'Edit' : 'New'} Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={save}>
                <div className="form-group">
                    <label htmlFor="editContactField1">Text</label>
                    <textarea className="form-control" name="note" id="editContactField1" cols="30" rows="10"
                              onChange={e => onTextChange}>{text}</textarea>
                    {showError(errors, 'text')}
                </div>
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="editContactField2">Last Name</label>*/}
                {/*    <input type="text" className="form-control" id="editContactField2"*/}
                {/*           value={lastName} onChange={onTextChange}/>*/}
                {/*    {showError(errors, 'lastName')}*/}
                {/*</div>*/}
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
