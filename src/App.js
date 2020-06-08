import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import UnauthorizedLayout from "./layouts/UnauthorizedLayout";
import AuthorizedLayout from "./layouts/AuthorizedLayout";
import AuthorizedRoute from "./shared/utils/AuthorizedRoute";
import {AuthUserProvider} from "./shared/utils/AuthUser";
import TopRouter from "./shared/utils/TopRouter";

function App() {
    return (
        <TopRouter>
            <AuthUserProvider>
                <Switch>
                    <Route path="/auth" component={UnauthorizedLayout}/>
                    <AuthorizedRoute path="/" component={AuthorizedLayout}/>
                    <Redirect to="/dashboard"/>
                </Switch>
            </AuthUserProvider>
        </TopRouter>
    );
}

export default App;

