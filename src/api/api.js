const API_URL = '/api';

const handleErrors = res => {
    if (!res.ok) {
        return res.json().then(error => {
            throw error
        });
    }
    return res;
};

export const listContacts = () => {
    return fetch(API_URL + '/clients')
        .then(res => res.json());
};

export const deleteContact = (contact) => {
    return fetch(`${API_URL}/clients/${contact.id}`,
        {
            method: 'DELETE'
        })
        .then(res => res.json());
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

export const apiLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        if (username === 'admin' && password === 'admin') {
            resolve()
        } else {
            reject()
        }
    })
};
