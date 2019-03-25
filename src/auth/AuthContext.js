import React, { PureComponent, Component, createElement  } from 'react';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    
    state = { isAuthenticated: false }
    
    constructor() {
        super()
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.isAuth = this.isAuth.bind(this)
    }
    
    baselogin() {
        //this.setState({ isAuth: true })
        
        // setting timeout to mimic an async login
        setTimeout(() => this.setState({ isAuthenticated: true }), 1000)
    }
    
    logout() {
        this.setState({ isAuthenticated: false })
    }
    
    login( user, password ) {
        fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"user":user, "password":password})
            })
            .then(res=>res.json())
            .then(res =>this.checkLogin(res))
        }
        
    checkLogin(result) {
        if (result.hasOwnProperty('loggedIn')) {
            console.log(result)
            this.setState({ isAuthenticated: result.loggedIn })
        } 
    }

    checkLoginStatus() {
        fetch('/loginstatus')
 		    .then(result=>result.json())
            .then(data=> { return data['loggedIn'] })
    }    

    isAuth() {
        if (this.state.isAuthenticated) {
            return true
        }
        //if (this.checkLoginStatus()) {
        //    //this.setState({ isAuthenticated: true })
        //    return true
        //}

        return true
    }
    
    render() {
        return (
            <AuthContext.Provider
                value={{
                    isAuthenticated: this.state.isAuthenticated,
                    isAuth: this.isAuth,
                    login: this.login,
                    logout: this.logout
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

function withAuth(Component) {
    
    return function AuthComponent(props) {
        return (
            <AuthContext.Consumer>
                { context => <Component {...props} {...context} context={context} 
                                login={context.login} logout={context.logout} isAuth={context.isAuth}
                            /> }
            </AuthContext.Consumer>
        );
    };
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer, AuthContext, withAuth }