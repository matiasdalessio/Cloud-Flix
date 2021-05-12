import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import usersActions from '../redux/actions/usersActions.js'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import { Form, Button } from 'react-bootstrap';

const LogInUsers = (props) => {   
    const [userLog, setUserLog] = useState({email:'', password:''})

    const readInput = e =>{
        const campo= e.target.name
        const valor= e.target.value
        setUserLog({
            ...userLog,
            [campo]: valor
        })
    }   
    
    const logInOk = async (e = null, userGoogle = null) => {
        e && e.preventDefault()
        let user = e ? userLog : userGoogle
        props.loguearUsuario(user)
    }

    const responseGoogle = (response) => {
        if (response.profileObj.email){
            logInOk(null, {email: response.profileObj.email, password: response.profileObj.googleId})
        }
      }

    return(
        <div className='signInContainer' style={{backgroundImage: "url(./assets/fondoForm.jpg)"}}>{/*  */}
        </ div>
        )    
}

const mapDispatchToProps = {
    loguearUsuario: usersActions.loguearUsuario
}

export default connect(null, mapDispatchToProps) (LogInUsers)