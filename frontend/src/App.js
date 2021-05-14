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
import Mylist from "./pages/MyList"
import Audiovisual from './pages/Audiovisual';
import usersActions from './redux/actions/usersActions';
import './preloader.css'
import { connect } from 'react-redux';
import ProfileSelection from './pages/ProfileSelection';
import Loader from "./components/Loader"
import profileActions from './redux/actions/profileActions';
import Login from './pages/LogIn';
import SignUp from './pages/SignUp';
import Pricing from './components/Pricing';
import Video from './components/Video';
import "../node_modules/video-react/dist/video-react.css"
import ActorFilms from './pages/ActorFilms'



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
    if (localStorage.getItem('profile') && this.props.selectedProfile.length === 0) {
      const profileId = JSON.parse(localStorage.getItem('profile'))
      this.props.profileSelected(profileId)
    }
  }
  
  render(){
    if (localStorage.getItem('token') && !this.props.userLogged) {
      return(<Loader/>)
    }

  return (
    localStorage.getItem('token') && this.props.userLogged && this.props.selectedProfile.length === 0 && !localStorage.getItem('profile')
      ?<ProfileSelection/>
      :<BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          {!localStorage.getItem('token') && <Route path="/login" component={ Login } />}
          {!localStorage.getItem('token') && <Route path="/signup" component={ SignUp } />}
          <Route path="/movies" component={ Movies } />
          <Route path="/series" component={ Series }  />
          <Route path="/popular" component={ Popular } />
          {localStorage.getItem('token') && <Route path="/mylist" component={ Mylist } />}
          {localStorage.getItem('token') && <Route path="/ProfileSelection" component={ ProfileSelection } />}
          <Route path="/audiovisual/:id" component={ Audiovisual } />
          <Route path="/pricing" component={ Pricing } />
          <Route path="/video" component={ Video } />
          <Route path ="/actorFilms/actor" component={ ActorFilms } />

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

}

export default connect(mapStateToProps,mapDispatchToProps)(App)

