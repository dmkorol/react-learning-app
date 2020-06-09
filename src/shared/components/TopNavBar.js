import React, {useState} from 'react';
import {useAuthUser} from "../utils/AuthUser";
import {Dropdown} from "react-bootstrap";
import ConfirmWindow from "./ConfirmWindow";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <a
        href="#" role="button"
        className="nav-link"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

function TopNavBar(props) {
    const {setLogged} = useAuthUser();
    const [isLogoutModalShown, showLogoutModal] = useState(false);

    const logout = () => {
        showLogoutModal(false);
        setLogged(false);
    };
    return (<>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"/>
                </button>

                <ul className="navbar-nav ml-auto">
                    <div className="topbar-divider d-none d-sm-block"/>
                    <li className="nav-item dropdown no-arrow" style={{position: 'relative'}}>
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">John Dou</span>
                                <img className="img-profile rounded-circle"
                                     src="https://source.unsplash.com/MYbhN8KaaEc/60x60"/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {/*<Dropdown.Item eventKey="1">Action</Dropdown.Item>*/}
                                {/*<Dropdown.Divider/>*/}
                                <Dropdown.Item eventKey="1" onClick={() => showLogoutModal(true)}>
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"/>
                                    Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </nav>

            {isLogoutModalShown && <ConfirmWindow
                title="Ready to Leave?"
                message='Select "Logout" below if you are ready to end your current session.'
                color="primary"
                buttonPrimaryTitle="Logout"
                onHide={() => showLogoutModal(false)}
                onConfirm={logout}/>}
        </>
    );
}

export default TopNavBar;
