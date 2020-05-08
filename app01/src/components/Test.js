import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AvailableUsers from '../components/AvailableUsers'
import NavDisplay from '../components/NavDisplay'

export default function App({socket}) {
  return (
    <Router>
      <div>
        
        <NavDisplay/>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

        <Route path="/availableusers">
            <AvailableUsers socket={socket}/>
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/users">
            <Users />
          </Route>
          
          <Route path="/availableusers">
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}