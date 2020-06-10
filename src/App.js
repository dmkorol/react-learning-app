import React, {Suspense, lazy} from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import AuthorizedRoute from "./shared/utils/AuthorizedRoute";
import {AuthUserProvider} from "./shared/utils/AuthUser";
import TopRouter from "./shared/utils/TopRouter";

const UnauthorizedLayout = lazy(()=>import('./layouts/UnauthorizedLayout'));
const AuthorizedLayout = lazy(()=>import('./layouts/AuthorizedLayout'));

function App() {
    return (
        <TopRouter>
            <AuthUserProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/auth" component={UnauthorizedLayout}/>
                        <AuthorizedRoute path="/" component={AuthorizedLayout}/>
                        <Redirect to="/dashboard"/>
                    </Switch>
                </Suspense>
            </AuthUserProvider>
        </TopRouter>
    );
}

export default App;

