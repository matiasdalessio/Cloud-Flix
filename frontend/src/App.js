import React from 'react'
import './App.css';
import './munoz.css'
import "./dupuy.css"
import './Forni.css'
import './Cuvillier.css'
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Popular from "./pages/Popular"
import Mylist from "./pages/MyList"
import Audiovisual from './pages/Audiovisual';
import usersActions from './redux/actions/usersActions';
import './preloader.css'
import { connect } from 'react-redux';
import ProfileSelection from './pages/ProfileSelection';
import LogIn from './pages/LogIn';


class App extends React.Component{

  componentDidMount() {
    if (!this.props.userLogged && localStorage.getItem('token')) {  
      const userData = JSON.parse(localStorage.getItem('userLogged'))
      const userLS= {
        token: localStorage.getItem('token'),
        ...userData
      }
      this.props.loginForcedLS(userLS)
    }
  }
  render(){

  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          {!localStorage.getItem('token') && <Route path="/signup" component={SignUp} />}
          {!localStorage.getItem('token') && <Route path="/login" component={LogIn} />}
          <Route path="/movies" component={ Movies } />
          <Route path="/series" component={ Series }  />
          <Route path="/popular" component={ Popular } />
          {localStorage.getItem('token') && <Route path="/mylist" component={ Mylist } />}
          {localStorage.getItem('token') && <Route path="/ProfileSelection" component={ ProfileSelection } />}
          <Route path="/audiovisual/:id" component={ Audiovisual } />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
  );
}}

const mapStateToProps = state => {
  return {
      userLogged: state.user.userLogged
  }
}
const mapDispatchToProps = {
  loginForcedLS :  usersActions.loginForcedLS,

}

export default connect(mapStateToProps,mapDispatchToProps)(App)

