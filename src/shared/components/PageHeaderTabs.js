import React from 'react'
import { NavLink } from 'react-router-dom'

export const PageHeaderTabs = ({ children }) => <nav className="nav nav-tabs">{children}</nav>

// Just a wrapper around NavLink
export const Tab = ({ ...rest }) => <NavLink activeClassName="active" exact={true} className="nav-item nav-link" {...rest} />
