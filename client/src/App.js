import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, operationName } from '@apollo/react-hooks';
import { ChatEngine } from 'react-chat-engine';
import ApolloClient from 'apollo-boost';

// Import pages
// User pages
import Landing from './pages/Landing';
import UserSettings from './pages/UserSettings';
import Home from './pages/Home';

import Message from './pages/Message';
import MessageJoined from './pages/MessageJoined';

import NotAPage from './pages/NotAPage';

// Admin Pages
import AdminLogin from './components/AdminLogin';
import SecondaryLoginForm from './components/SecondaryLoginForm';
import AdminHome from './pages/AdminHome';
import BirthworkerSignup from './pages/BirthworkerSignup';
import AdminUsers from './pages/AdminUsers';
import UserProfile from './pages/UserProfile'
import AdminSettings from './pages/AdminSettings';

// import worker pages
import WorkerSettings from './pages/WorkerSettings';

// making the connection to the graphql backend server
// "uri" = Uniform Resource Identifier
// this function also sets up looking at the user when logged in
const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql'
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/settings" component={UserSettings} />
            <Route exact path="/home" component={Home}/>

            <Route exact path="/admin-login" component={AdminLogin}/>
            <Route exact path="/admin/265317993996/signup" component={BirthworkerSignup}/>
            <Route exact path="/user-login" component={SecondaryLoginForm} />
            <Route exact path="/admin-home" component={AdminHome}/>
            <Route exact path="/admin-users" component={AdminUsers} />
            <Route exact path="/admin-settings" component={AdminSettings}/>
            <Route exact path="/profile/user/:username" component={UserProfile}/>
            <Route exact path='/admin/settings' component={WorkerSettings} />

            <Route exact path='/messages' component={
            <ChatEngine 
              height='100vh'
              projectID=""
              userName=""
              userSecret=""
            />
            } />
            <Route exact path='/chat' component={MessageJoined} />

            <Route component={NotAPage}/>

          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}
export default App;
