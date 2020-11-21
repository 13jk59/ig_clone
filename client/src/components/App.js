import '../stylesheets/App.css';
import React from 'react';
import {SignIn} from './SignIn';
import {Register} from './Register';
import {Footer} from './Footer';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends React.Component{

  render() {
    return (
      <div className="App">
        <Router>
          
          <Switch>
            <Route exact path = '/'>
              <SignIn /> 
            </Route>

            <Route exact path = '/register'>
              <Register /> 
            </Route>
          </Switch>

          <Route>
            <Footer /> 
          </Route>

        </Router>
      </div>
    )
  }
}

export default App;
