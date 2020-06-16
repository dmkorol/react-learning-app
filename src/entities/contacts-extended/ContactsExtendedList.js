import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";


import DeleteLinkWithConfirmation from "../../shared/components/DeleteLinkWithConfirmation";
import {DateFormatType} from "../../shared/utils/moment.settings";
import {createContact, listExpendedContacts} from "./contactsExtended.api";
import {ContactExtendedNew} from "./ContactsExtendedNew";

function ContactsExtendedList() {
    const [isNewOpened, setShowNewModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        setLoading(true);
        listExpendedContacts()
            .then(contacts => setCustomers(contacts))
            .finally(() => setLoading(false));

    }, []);

    const handleHide = () => setShowNewModal(false);

    const showAddNewModal = () => {
        setShowNewModal(true)
    };

    const addContact = async (contact) => {
        return createContact(contact).then(newContact => {
            setCustomers([
                ...customers,
                newContact,
            ]);
            return newContact;
        });
    };

    const deleteItem = contact => (e) => {
        // deleteContact(contact).then(_ => {
        //     setCustomers(
        //         customers.filter(item => item.id !== contact.id)
        //     );
        // })
    };

    return (
        <>
            {/* Page Heading */}
            <div className="d-flex align-items-center">
                <h1 className="h3 mb-0 text-gray-800 ">Contacts Extended</h1>
                <div className="ml-auto p-2">
                    <Button onClick={showAddNewModal}>
                        <i className="fas fa-plus-circle fa-sm"/> New contact</Button>
                </div>
            </div>
            <p>Contacts with additional information and separate pages for the New and Edit pages.</p>
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
                                            <a href="#">{user.firstName} {user.lastName}</a>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.createdDate.format(DateFormatType.M3_D2_CM_Y4)}</td>
                                        <td style={{width: '120px'}}>
                                            <span className="editButtons">
                                                <a href="#">Edit</a>
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
                isNewOpened && <ContactExtendedNew onSave={addContact} onHide={handleHide} />
            }
        </>
    )
}

export default ContactsExtendedList;
