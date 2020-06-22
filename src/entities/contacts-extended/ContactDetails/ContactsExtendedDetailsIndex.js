import React, {useState} from 'react';
import {Link, Redirect, Route} from "react-router-dom";
import ContactsExtendedNotes from "./ContactsExtendedNotes";
import ContactsExtendedEmails from "./ContactsExtendedEmails";
import ContactsExtendedCalls from "./ContactsExtendedCalls";
import {PageHeaderTabs, Tab} from "../../../shared/components/PageHeaderTabs";
import {Switch} from "react-bootstrap";
import ContactsExtendedDetailsEdit from "./ContactsExtendedDetailsEdit";
import {mainRoutes} from "../../../shared/main-routes";

const notesTab = {
    path: 'notes',
    title: 'Notes',
    cmp: ContactsExtendedNotes
};

const emailsTab = {
    path: 'emails',
    title: 'Emails',
    cmp: ContactsExtendedEmails
};

const callsTab = {
    path: 'calls',
    title: 'Calls',
    cmp: ContactsExtendedCalls
}

const contactsExtendedEditTabs = [notesTab, emailsTab, callsTab];

function ContactsExtendedDetailsIndex({match, location}) {
    const {contactId} = match.params;
    console.log('contactId', contactId);

    return (
        <div>
            <Link to={mainRoutes.contactsExtended}>Back</Link>
            <div>
                <h3>Contact Details</h3>
            </div>
            <div className="card mb-4">
                <div className="card-header">
                    <ContactsExtendedDetailsEdit contactId={contactId}/>
                </div>
                <div className="card-body">
                    <PageHeaderTabs>
                        {contactsExtendedEditTabs.map((item, index) =>
                            <Tab key={index} to={`${match.url}/${item.path}`}>{item.title}</Tab>
                        )}
                    </PageHeaderTabs>
                    <div className="pt-3">
                        <Switch>
                            {contactsExtendedEditTabs.map((item, index) =>
                                <Route key={index} path={`${match.path}/${item.path}`} exact={true}
                                       component={item.cmp}/>
                            )}
                            <Redirect to={`${match.url}/${notesTab.path}`}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactsExtendedDetailsIndex;
