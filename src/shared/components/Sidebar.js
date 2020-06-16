import React from 'react';
import {NavLink} from "react-router-dom";

function Sidebar({match}) {
    const menuItems = [
        {
            name: 'Dashboard',
            icon: 'fa-tachometer-alt',
            url: '/dashboard'
        }, {
            name: 'Contacts',
            icon: 'fa-address-book',
            url: '/contacts'
        }, {
            name: 'Contacts Extended',
            icon: 'fa-address-card',
            url: '/contacts-extened'
        }
    ];
    return (<>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-address-book"/>
                    </div>
                    <div className="sidebar-brand-text mx-3"> ADMIN <sup>0.1</sup></div>
                </a>
                <hr className="sidebar-divider my-0"/>

                <br/>
                {
                    menuItems.map((menuItem, index) =>
                        (<li className="nav-item" key={index}>
                            <NavLink activeClassName="active" className="nav-link" to={`${menuItem.url}`}>
                                <i className={`fas fa-fw ${menuItem.icon}`}/>
                                <span>{menuItem.name}</span>
                            </NavLink>
                        </li>)
                    )
                }

                {/*<div className="text-center d-none d-md-inline">*/}
                {/*    <button className="rounded-circle border-0" id="sidebarToggle"/>*/}
                {/*</div>*/}
            </ul>
        </>
    );
}

export default Sidebar;
