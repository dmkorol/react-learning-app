import React from 'react';
import Sidebar from "../shared/components/Sidebar";
import TopNavBar from "../shared/components/TopNavBar";
import Footer from "../shared/components/Footer";
import Dashboard from "../entities/dashboard/Dashboard";
import {Redirect, Route, Switch} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ContactsList from "../entities/contacts/ContactsList";
import ContactsExtendedIndex from "../entities/contacts-extended/ContactsExtendedIndex";
import {mainRoutes} from "../shared/main-routes";

function AuthorizedLayout() {
    return (
        <>
            <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopNavBar/>
                    <div className="container-fluid">
                        <Switch>
                            <Route path={mainRoutes.contacts} component={ContactsList}/>
                            <Route path={mainRoutes.contactsExtended} component={ContactsExtendedIndex}/>
                            <Route path={mainRoutes.dashboard} component={Dashboard}/>
                            <Redirect to={mainRoutes.dashboard}/>
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
