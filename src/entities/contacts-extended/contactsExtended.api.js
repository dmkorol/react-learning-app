import {API_URL} from '../../api/api';
import {handleErrors} from '../../api/api';
import moment from "moment";
import {DateFormatType} from "../../shared/utils/moment.settings";

export const listExpendedContacts = () => {
    return fetch(API_URL + '/clients-extended')
        .then(res => res.json())
        .then(arr => arr.map(convertDateISOToMoment))
};

function convertDateISOToMoment(item) {
    if (item && item.createdDate) {
        item.createdDate = moment(item.createdDate);
        return item;
    }
    return item;
}

// export const deleteContact = (contact) => {
//     return fetch(`${API_URL}/clients/${contact.id}`,
//         {
//             method: 'DELETE'
//         })
//         .then(res => res.json());
// };
export const createContact = (contact) => {
    contact.createdDate = (new Date()).toISOString();
    let url = API_URL + '/clients-extended';
    delete contact.id;
    return fetch(url,
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

};


export const updateContact = (contact) => {
    contact.createdDate = (new Date()).toISOString();
    let url = API_URL + '/clients';

    // Distinguish Create a New from Edit
    let method = 'POST';
    if (contact.id !== undefined) {
        method = 'PUT';
        url += '/' + contact.id;
    }
    delete contact.id;

    return fetch(url,
        {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
        .then(handleErrors)
        .then(res => res.json());
};

// export const apiLogin = (username, password) => {
//     return new Promise((resolve, reject) => {
//         if (username === 'admin' && password === 'admin') {
//             resolve()
//         } else {
//             reject()
//         }
//     })
// };
