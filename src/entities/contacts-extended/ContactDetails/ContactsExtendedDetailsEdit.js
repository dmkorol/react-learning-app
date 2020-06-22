import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {ContactExtendedEdit} from "../ContactsExtendedEdit";
import {ContactsExtended} from "../../../api/ContactsExtended/contacts.api";

const contactDetailsLabels = [
    {label: 'First Name', key: 'firstName'},
    {label: 'Last Name', key: 'lastName'},
    {label: 'Email', key: 'phone'},
    {label: 'Phone', key: 'email'},
    // {label: 'Added Date', key: 'createdDate'},
];

const ContactsExtendedDetailsEdit = React.memo(({contactId}) => {
    const [isLoading, setLoading] = useState(false);
    const [customer, setCustomer] = useState(undefined);
    const [isShowEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        ContactsExtended.getContact(contactId)
            .then(contact => setCustomer(contact))
            .finally(() => setLoading(false));
    }, [contactId]);

    const openEdit = () => setShowEditModal(true);
    const handleHide = () => setShowEditModal(false);

    const updateContact = async (contact) => {
        return ContactsExtended.updateContact(contact).then(newContact => {
            setCustomer(newContact);
            return newContact;
        });
    };

    return (<>
        {isLoading ? (
            <div className="text-center h2">Loading...</div>
        ) : (
            <div className="d-flex">
                <div className="row w-100">
                    {contactDetailsLabels.map((item, index) =>
                        <div className="col-3" key={index}>
                            <div className="form-group">
                                <label>{item.label}:</label>
                                <div><b className="text-gray-800">{customer ? customer[item.key] : ''}</b></div>
                            </div>
                        </div>)}
                </div>
                <div className="ml-auto d-flex align-items-center">
                    {customer && ('id' in customer) && <Button onClick={openEdit}>Edit</Button>}
                </div>
            </div>
        )}
        {
            isShowEditModal &&
            <ContactExtendedEdit onSave={updateContact} onHide={handleHide} selectedContact={customer}/>
        }
    </>);
});

export default ContactsExtendedDetailsEdit;

