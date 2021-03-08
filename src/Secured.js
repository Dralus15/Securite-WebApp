import React, { Component } from 'react';
import Keycloak from 'keycloak-js';

class Secured extends Component {

    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false };
    }

    componentDidMount() {
        console.log("componentDidMount 1");
        const keycloak = Keycloak('keycloak.json');
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            console.log("componentDidMount 2");
            this.setState({ keycloak: keycloak, authenticated: authenticated })
        })
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) return (
                <div>
                    <p>This is a Keycloak-secured component of your application. You shouldn't be able
                        to see this unless you've authenticated with Keycloak.</p>
                </div>
            ); else return (<div>Unable to authenticate!</div>)
        }
        return (
            <div>Initializing Keycloak...</div>
        );
    }
}
export default Secured;
