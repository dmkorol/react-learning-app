import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {ContactEdit} from "./ContactsEdit";
import {updateContact, listContacts, deleteContact} from "../api/api";

function ContactsList() {
    const [isEditOpened, setShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [selectedContact, setSelectedContact] = useState({});

    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                setCustomers(await listContacts());
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }

        getData();
    }, []);

    const handleHide = () => setShow(false);

    const showAddNewModal = () => {
        setSelectedContact({});
        setShow(true)
    };

    const showEditModal = (user) => () => {
        setSelectedContact(user);
        setShow(true);
    };

    const addContact = async (contact) => {
        const isNewContact = contact.id === undefined;
        return updateContact(contact).then(newContact => {
            // Different techniques for updating a Contact List depends Creating or Editing flow
            if (isNewContact) {
                setCustomers([
                    ...customers,
                    newContact,
                ]);
            } else {
                setCustomers(
                    customers
                        .map(item => item.id === newContact.id ? newContact : item)
                );
            }
        })
    };

    const deleteItem = contact => (e) => {
        e.preventDefault();
        deleteContact(contact).then(_ => {
            setCustomers(
                customers.filter(item => item.id !== contact.id)
            );
        })
    };

    return (
        <>
            {/* Page Heading */}
            <div className="d-flex align-items-center">
                <h1 className="h3 mb-0 text-gray-800 ">Contacts</h1>
                <div className="ml-auto p-2">
                    <Button onClick={showAddNewModal}>+ Add</Button>
                </div>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">

                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover" width="100%" cellSpacing={0}>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Added Date</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>

                            {isLoading ? (
                                <tr>
                                    <td colSpan={999}>
                                        <div className="text-center h2">Loading...</div>
                                    </td>
                                </tr>
                            ) : (
                                customers.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <a href="#"
                                               onClick={showEditModal(user)}>{user.firstName} {user.lastName}</a>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.createdDate}</td>
                                        <td style={{width: '120px'}}>
                                            <span className="editButtons">
                                                <a href="#" onClick={showEditModal(user)}>Edit</a>
                                                <a href="#" className="text-danger"
                                                   onClick={deleteItem(user)}>Delete</a>
                                            </span>
                                        </td>
                                    </tr>))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal*/
                isEditOpened && <ContactEdit onSave={addContact} onHide={handleHide} selectedContact={selectedContact}/>
            }
        </>
    )
}

export default ContactsList;
