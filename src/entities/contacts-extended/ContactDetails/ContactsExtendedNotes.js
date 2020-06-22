import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {ContactExtendedNoteEdit} from "./ContactsExtendedNotesEdit";
import DeleteLinkWithConfirmation from "../../../shared/components/DeleteLinkWithConfirmation";

function ContactsExtendedNotes(props) {
    const [showEdit, setShowEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(undefined);
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const shoeEdit = (item) => (e) => {
        e.preventDefault();
        setSelectedItem(item)
        setShowEdit(true);
    };

    useEffect(() => {
        setLoading(true);
        // ContactsExtended.listExpendedContacts()
        //     .then(contacts => setItems(contacts))
        //     .finally(() => setLoading(false));

    }, []);

    const updateNote = async (note) => {
        // return ContactsExtended.createContact(contact).then(newContact => {
        //     setCustomers([
        //         ...customers,
        //         newContact,
        //     ]);
        //     return newContact;
        // });
        return new Promise((resolve, reject) => resolve({}));
    };

    return (<div>
            <div className="d-flex mb-2">
                {!isLoading && items.length && <div>{items.length} Notes were found</div>}
                <Button className="ml-auto" onClick={() => setShowEdit(true)}>Create Notes</Button>
            </div>
            {isLoading ? (
                <div className="text-center h2">Loading...</div>
            ) : (
                items.map(item => (
                    <div className="card border-left-primary shadow mb-2">
                        <div className="card-body editButtonsParent">
                            <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                    <i className="fas fa-comments fa-2x text-gray-300 mr-3"></i>
                                </div>
                                <div className="col mr-2">
                                    <div className="text-xs text-primary text-uppercase mb-1">Created 16 Jul 2020 3:45
                                        PM
                                    </div>
                                    <div className="mb-0 text-gray-800">asdfasd asdf asdf asdf asdf asdf asdf asdf asdf
                                        asdf
                                    </div>
                                </div>
                                <div className="col-auto editButtons">
                                    <div className="">
                                        <a href="#" onClick={shoeEdit(item)}>Edit</a>
                                        <DeleteLinkWithConfirmation actionFn={() => false}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {showEdit && <ContactExtendedNoteEdit selectedItem={selectedItem} onHide={() => setShowEdit(false)}
                                                  onSave={updateNote}/>}
        </div>
    );
}

export default ContactsExtendedNotes;
