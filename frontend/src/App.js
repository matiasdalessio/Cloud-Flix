import React from 'react'
import './App.css';
import './munoz.css'
import "./dupuy.css"
import './Forni.css'
import './Cuvillier.css'
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/LogIn"
import SignUp from "./pages/SignUp"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Popular from "./pages/Popular"
import Mylist from "./pages/MyList"
import Header from './components/Header';
import Audiovisual from './pages/Audiovisual';
import usersActions from './redux/actions/usersActions';
import { connect } from 'react-redux';

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
      {this.props.userlogged && alert("hola" + this.props.userlogged.id)}
        <Header />
        <Switch>
          <Route exact path="/" component={ Home } />
          {!this.props.userLogged && <Route path="/signup" component={SignUp} />}
          {!this.props.userLogged && <Route path="/login" component={Login} />}
          <Route path="/movies" component={ Movies } />
          <Route path="/series" component={ Series }  />
          <Route path="/popular" component={ Popular } />
          {!this.props.userLogged &&<Route path="/mylist" component={ Mylist } />}
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

