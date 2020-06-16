import React from 'react';
import ContactsList from "../entities/contacts/ContactsList";
import ContactsExtendedList from "../entities/contacts-extended/ContactsExtendedList";
import Sidebar from "../shared/components/Sidebar";
import TopNavBar from "../shared/components/TopNavBar";
import Footer from "../shared/components/Footer";
import Dashboard from "../entities/dashboard/Dashboard";
import {Redirect, Route, Switch} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

function AuthorizedLayout() {
    return (
        <>
            <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopNavBar/>
                    <div className="container-fluid">
                        <Switch>
                            <Route path="/contacts" component={ContactsList} />
                            <Route path="/contacts-extened" component={ContactsExtendedList} />
                            <Route path="/dashboard" component={Dashboard} />
                            <Redirect to="/dashboard"/>
                        </Switch>
                    </div>
                </div>
                <Footer/>
            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"/>
            </a>
        </>
    );
}

export default AuthorizedLayout;
