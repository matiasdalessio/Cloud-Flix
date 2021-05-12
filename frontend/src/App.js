import React from 'react'
import './App.css';
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/LogIn"
import SignUp from "./pages/SignUp"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Popular from "./pages/Popular"
import Mylist from "./pages/MyList"
import Header from './components/Header';

function App() {
  return (
     <BrowserRouter>
     <Header />
      <Switch>
        <Route exact path="/" component={ Home } />
          <Route path="/login" component={ Login }  />
          <Route path="/signup" component={ SignUp } />
          <Route path="/movies" component={ Movies } />
          <Route path="/series" component={ Series }  />
          <Route path="/popular" component={ Popular } />
          <Route path="/mylist" component={ Mylist } />
        <Redirect to="/" />
      </Switch>
     </BrowserRouter>
  );
}


export default App;
