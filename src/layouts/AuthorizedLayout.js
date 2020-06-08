import React from 'react';
import ContactsList from "../entities/contacts/ContactsList";
import Sidebar from "../shared/components/Sidebar";
import TopNavBar from "../shared/components/TopNavBar";
import Footer from "../shared/components/Footer";
import Dashboard from "../entities/dashboard/Dashboard";
import {Route, Switch} from "react-router-dom";

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
                            <Route path="/dashboard" component={Dashboard} />
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
