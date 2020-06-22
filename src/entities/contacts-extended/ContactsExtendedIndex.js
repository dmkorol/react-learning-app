import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ContactsExtendedList from "./ContactsExtendedList";
import ContactsExtendedDetailsIndex from "./ContactDetails/ContactsExtendedDetailsIndex";

function ContactsExtendedIndex({ match }) {
    return (
        <Switch>
            <Route path={`${match.path}/:contactId/edit`} component={ContactsExtendedDetailsIndex} />
            <Route path={`${match.path}`} exact={true} component={ContactsExtendedList} />
        </Switch>
    );
}

export default ContactsExtendedIndex;
