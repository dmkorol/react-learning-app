import {API_URL} from '../api';
import {handleErrors} from '../api';
import {convertDateISOToMoment} from "../../shared/utils/moment.settings";

const CURRENT_URL = '/notes';

export const NotesApi = {
    list: (contactId) => {
        return fetch(API_URL + CURRENT_URL)
            .then(res => res.json())
            .then(arr => arr
                .filter(item => parseInt(item.clientExtendedId, 10) === parseInt(contactId, 10))
                .map(convertDateISOToMoment(['createdDate']))
                .sort((a, b) => -a.createdDate + b.createdDate));
    },

    update: (item) => {
        const isUpdate = (item && item.id !== undefined);
        const method = isUpdate ? 'PUT' : 'POST';
        const url = API_URL + CURRENT_URL + (isUpdate ? '/' + item.id : '');
        if(!isUpdate) {
            item.createdDate = (new Date()).toISOString();
        }
        return fetch( url,
            {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(newItem => new Promise((resolve) => {
                    resolve(convertDateISOToMoment(['createdDate'])(newItem));
                })
            );
    },

    delete: (item) => {
        return fetch(API_URL + CURRENT_URL + `/${item.id}`,
            {
                method: 'DELETE'
            })
            .then(res => res.json());
    }
}
