import React from 'react'
import './App.css';
import './munoz.css'
import "./dupuy.css"
import './Forni.css'
import './Cuvillier.css'
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Popular from "./pages/Popular"
import MyList from "./pages/MyList"
import usersActions from './redux/actions/usersActions';
import './preloader.css'
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import ProfileSelection from './components/ProfileSelection';
import profileActions from './redux/actions/profileActions';
import Login from './pages/LogIn';
import SignUp from './pages/SignUp';
import Pricing from './components/Pricing';
import Video from './components/Video';
import "../node_modules/video-react/dist/video-react.css"
import ActorFilms from './components/ActorFilms'
import ServerDown from './components/ServerDown';



class App extends React.Component{

  componentDidMount() {
    if (!this.props.userLogged && localStorage.getItem('token')) {  
      const userData = JSON.parse(localStorage.getItem('userLogged'))
      const userLS= {
        token: localStorage.getItem('token'),
        ...userData
      }
      this.props.loginForcedLS(userLS, this.props.history)
      this.props.getUserProfiles(userData.id, userLS)
    }
    if (localStorage.getItem('profile') && this.props.selectedProfile.length === 0) {
      const profileId = JSON.parse(localStorage.getItem('profile'))      
      this.props.profileSelected(profileId)
    }
  }
  
  render(){

        return (
          
          localStorage.getItem('token') && this.props.userLogged && this.props.selectedProfile.length === 0 
            ?<ProfileSelection/>
            :<BrowserRouter>
              <Switch>
                <Route exact path="/" component={ Home } />
                {!this.props.userLogged && <Route path="/login" component={ Login } />}
                {!localStorage.getItem('token') && <Route path="/signup" component={ SignUp } />}
                {localStorage.getItem('token') && <Route path="/mylist" component={ MyList } />}
                {localStorage.getItem('token') && <Route path="/ProfileSelection" component={ ProfileSelection } />}
                <Route path="/movies" component={ Movies } />
                <Route path="/series" component={ Series }  />
                <Route path="/popular" component={ Popular } />
                <Route path="/pricing" component={ Pricing } />
                <Route path="/video" component={ Video } />
                <Route path ="/actorFilms/:name" component={ ActorFilms }/>
                <Route path ="/serverdown" component={ ServerDown }/>
                <Redirect to="/" />
              </Switch>
            </BrowserRouter>
        );
}}

const mapStateToProps = state => {
  return {
      userLogged: state.user.userLogged,
      selectedProfile: state.profile.selectedProfile
  }
}
const mapDispatchToProps = {
  loginForcedLS :  usersActions.loginForcedLS,
  profileSelected:  profileActions.profileSelected,
  getUserProfiles: profileActions.getUserProfiles,

}

export default connect(mapStateToProps,mapDispatchToProps)(App)

