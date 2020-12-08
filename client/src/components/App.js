import '../stylesheets/App.css';
import React from 'react';
import {SignIn} from './SignIn';
import {Register} from './Register';
import {Footer} from './Footer';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {connect} from 'react-redux';
import {mapDispatchToProps_mainApp, mapStateToProps_mainApp} from '../redux/reactReduxMaps';

/**
 * This class represents a React Component that acts as the main wrapper for the components
 * for this application. In addition, this component is responsible for routing with react-router.
 * 
 * @class @public 
 */
class App extends React.Component{
  constructor(props) {
    super(props);
  }


  _animate_input_labels(e) {
    const input_target = e.target;
    const label_input_target =input_target.nextElementSibling; 
    label_input_target.className = ''; 
    input_target.className = '';
    if (input_target.value.length === 0) {
        label_input_target.classList.add('label_input_auth');
        input_target.classList.add('authInputs');
    }
    else {
        label_input_target.classList.add('label_input_auth_written');
        input_target.classList.add('authInputsPlaceholderAnimPadding'); 
    }
  }


  render() {
    return (
      <div className="App">
        <Router>
          
          <Switch>
            <Route exact path = '/'>
              <SignIn 
              _animate_input_labels = {this._animate_input_labels}
              logUserIn = {this.props.logUserIn}
              curr_user_status = {this.props.curr_user_status}
              curr_user_error = {this.props.curr_user_error}
              /> 
            </Route>

            <Route exact path = '/register'>
              <Register 
              _animate_input_labels = {this._animate_input_labels}
              register_user_logIn = {this.props.register_user_logIn}
              curr_user_status = {this.props.curr_user_status}
              curr_user_error = {this.props.curr_user_error}
              /> 
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

const connectedComponent = connect(mapStateToProps_mainApp, mapDispatchToProps_mainApp)(App); 

export {connectedComponent as App}; 