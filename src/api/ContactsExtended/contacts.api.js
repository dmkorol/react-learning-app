import {API_URL} from '../api';
import {handleErrors} from '../api';
import {convertDateISOToMoment} from "../../shared/utils/moment.settings";

const CURRENT_URL = '/clients-extended';

export const ContactsExtended = {
    listExpendedContacts: () => {
        return fetch(API_URL + CURRENT_URL)
            .then(res => res.json())
            .then(arr => arr.map(convertDateISOToMoment(['createdDate'])));
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
                    resolve(convertDateISOToMoment(['createdDate'])(item));
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
                    resolve(convertDateISOToMoment(['createdDate'])(item));
                })
            );
    },

    getContact: (contactId) => {
        return fetch(API_URL + CURRENT_URL + '/' + contactId)
            .then(res => res.json())
            // .then(item => convertDateISOToMoment(['createdDate'])(item));
    },

    deleteContact: (contact) => {
        return fetch(API_URL + CURRENT_URL + `/${contact.id}`,
            {
                method: 'DELETE'
            })
            .then(res => res.json());
    }
}
