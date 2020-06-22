import {API_URL} from '../api';
import {handleErrors} from '../api';
import moment from "moment";

const CURRENT_URL = '/clients-extended';

export const ContactsExtendedNotes = {
    listExpendedContacts: () => {
        return fetch(API_URL + CURRENT_URL)
            .then(res => res.json())
            .then(arr => arr.map(convertDateISOToMoment));
    },

    createContact: (contact) => {
        contact.createdDate = (new Date()).toISOString();
        delete contact.id;
        return fetch(API_URL + CURRENT_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact)
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(item => new Promise((resolve) => {
                    resolve(convertDateISOToMoment(item));
                })
            );
    },

    updateContact: (contact) => {
        return fetch(API_URL + CURRENT_URL + '/' + contact.id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact)
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(item => new Promise((resolve) => {
                    resolve(convertDateISOToMoment(item));
                })
            );
    },

    getContact: (contactId) => {
        return fetch(API_URL + CURRENT_URL + '/' + contactId)
            .then(res => res.json())
            // .then(item => convertDateISOToMoment(item));
    },

    deleteContact: (contact) => {
        return fetch(API_URL + CURRENT_URL + `/${contact.id}`,
            {
                method: 'DELETE'
            })
            .then(res => res.json());
    }
}


function convertDateISOToMoment(item) {
    if (item && item.createdDate) {
        item.createdDate = moment(item.createdDate);
        return item;
    }
    return item;
}
