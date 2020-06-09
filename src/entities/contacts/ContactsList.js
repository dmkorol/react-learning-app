import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {ContactEdit} from "./ContactsEdit";
import {updateContact, listContacts, deleteContact} from "../../api/api";
import DeleteLinkWithConfirmation from "../../shared/components/DeleteLinkWithConfirmation";
import moment from "moment";
import {DateFormatType} from "../../shared/utils/moment.settings";

function ContactsList() {
    const [isEditOpened, setShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [selectedContact, setSelectedContact] = useState({});

    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                const contacts = await listContacts();
                // TODO: discuss where to move it
                setCustomers(contacts.map(item => {
                    item.createdDate = moment(item.createdDate).format(DateFormatType.M3_D2_CM_Y4);
                    return item;
                }));
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

    const showEditModal = (user) => (e) => {
        // TODO: discuss is ti possible to reduce it
        e.preventDefault();
        setSelectedContact(user);
        setShow(true);
    };

    const addContact = async (contact) => {
        const isNewContact = contact.id === undefined;
        return updateContact(contact).then(newContact => {
            // TODO: discuss where to move it
            newContact.createdDate = moment(newContact.createdDate).format(DateFormatType.M3_D2_CM_Y4);
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
                    <Button onClick={showAddNewModal}>
                        <i className="fas fa-plus-circle fa-sm"/> New contact</Button>
                </div>
            </div>
            <p>Real data from API.</p>
            <div className="card shadow mb-4">
                <div className="card-header py-3">

                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover" width="100%" cellSpacing={0}>
                            <thead>
                            <tr>
                                <th className="text-primary">Name</th>
                                <th className="text-primary">Email</th>
                                <th className="text-primary">Phone</th>
                                <th className="text-primary">Added Date</th>
                                <th className="text-primary"></th>
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
                                                <DeleteLinkWithConfirmation actionFn={deleteItem(user)}/>
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
