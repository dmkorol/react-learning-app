import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {ContactExtendedNoteEdit} from "./ContactsExtendedNotesEdit";
import DeleteLinkWithConfirmation from "../../../shared/components/DeleteLinkWithConfirmation";
import {NotesApi} from "../../../api/ContactsExtended/notes.api";
import {DateFormatType} from "../../../shared/utils/moment.settings";

function ContactsExtendedNotes({match}) {
    const {contactId} = match.params || {};
    const [showEdit, setShowEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const shoeEdit = (item) => (e) => {
        e.preventDefault();
        setSelectedItem(item)
        setShowEdit(true);
    };

    const loadList = () => {
        setLoading(true);
        return NotesApi.list(contactId)
            .then(items => setItems(items))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        loadList()
    }, []);

    const updateItem = async (item) => NotesApi.update(item).then(() => loadList());

    const deleteItem = (item) => (e) => NotesApi.delete(item).then(() => setItems(items.filter(i => i.id !== item.id)));

    return (<div>
            <div className="d-flex mb-2">
                {!isLoading && (items.length ? <div>{items.length} Notes were found</div> : '')}
                <Button className="ml-auto" onClick={() => setShowEdit(true)}>Create Notes</Button>
            </div>
            {!isLoading && !items.length && <div className='text-center h4 pt-2 pb-4'>There are no Notes</div>}
            {isLoading ? (
                <div className="text-center h2">Loading...</div>
            ) : (
                items.map((item, index) => (
                    <div className="card border-left-primary shadow mb-2" key={index}>
                        <div className="card-body editButtonsParent">
                            <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                    <i className="fas fa-comments fa-2x text-gray-300 mr-3"></i>
                                </div>
                                <div className="col mr-2">
                                    <div className="text-xs text-primary text-uppercase mb-1">
                                        Created {item.createdDate
                                    && item.createdDate.format
                                    && item.createdDate.format(DateFormatType.D2_M3_Y4_CM_h2_m2_A)}
                                    </div>
                                    <div className="mb-0 text-gray-800">{item.text}</div>
                                </div>
                                <div className="col-auto editButtons">
                                    <div className="">
                                        <a href="#" onClick={shoeEdit(item)}>Edit</a>
                                        <DeleteLinkWithConfirmation actionFn={deleteItem(item)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {showEdit && <ContactExtendedNoteEdit
                clientExtendedId={contactId}
                selectedItem={selectedItem}
                onHide={() => setShowEdit(false)}
                onSave={updateItem}/>}
        </div>
    );
}

export default ContactsExtendedNotes;
