import React from "react";
import {API, graphqlOperation, Auth, Hub} from 'aws-amplify';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { getUser } from './graphql/queries';
import { registerUser } from './graphql/mutations';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MarketPage from './pages/MarketPage';
import Navbar from './components/Navbar';

import "./App.css";

export const history = createBrowserHistory();

export const UserContext = React.createContext();

class App extends React.Component {
  state = {
    user: null,
  };

  componentDidMount(){
    this.getUserData();
    Hub.listen('auth',this, 'onHubCapsule');
    console.dir(AmplifyTheme)
  }

  getUserData = async ()=>{
    const user = await Auth.currentAuthenticatedUser();
    user ? this.setState({user}) : this.setState({user:null});
  }

  onHubCapsule = capsule =>{
    switch (capsule.payload.event) {
      case "signIn":
        console.log('signed in');
        this.getUserData();
        this.registerNewUser(capsule.payload.data)
        break;
      case "signUp":
        console.log('signed up');
        break;
      case 'signOut':
        console.log('signed out');
        this.setState({user:null});
        break;
      default:
        return;
    }
  }

  registerNewUser = async signInData =>{
    const getUserInput = {
      id: signInData.signInUserSession.idToken.payload.sub,
    };
    const {data} = await API.graphql(graphqlOperation(getUser,getUserInput));
    // if we can't get a user (meaning the user hasn't been registered before,
    // then we execute registerUsre)
    if(!data.getUser){
      try {
        const registerUserInput = {
          ...getUserInput,
          username: signInData.username,
          email: signInData.signInUserSession.idToken.payload.email,
          registered: true
        }

        const newUser = await API.graphql(graphqlOperation(registerUser, { input: registerUserInput }));
        console.log({newUser})
      } catch (error) {
        console.error('Error registering new user',error)
      }
    }
  }

  handleSignout = async () =>{
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error siging out user',error);
    }
  }

  render() {
    const {user} = this.state;
    return !user 
    ?(<Authenticator theme={theme}/>) 
    :(
      <UserContext.Provider value={{user}}>
        <Router history={history}>
        <>
          {/* Navbar */}
          <Navbar user={user} handleSignout={this.handleSignout} />
          {/* Routes */}
          <div className="app-container">
            <Route exact path="/" component={HomePage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/markets/:marketId" component={
              ({match})=>
                <MarketPage marketId={match.params.marketId} user={user} />
              } />
          </div>
        </>
      </Router>
    </UserContext.Provider>
    );
  }
}
console.log(AmplifyTheme.button);
const theme = {
  ...AmplifyTheme,
  button: {...AmplifyTheme.button, backgroundColor: "var(--amazonOrange)"},
  sectionBody: {...AmplifyTheme.sectionBody, padding: "5px"},
  sectionHeader: {...AmplifyTheme.sectionHeader, backgroundColor: "var(--squidInk)"}
}

// export default withAuthenticator(App, true,[],null,theme);
export default App;
