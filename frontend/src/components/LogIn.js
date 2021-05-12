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
        let usuario = e ? userLog : userGoogle
        props.loguearUsuario(usuario)
    }

    const responseGoogle = (response) => {
        if (response.profileObj.email){
            logInOk(null, {email: response.profileObj.email, password: response.profileObj.googleId})
        }
      }

    return(
        <div className='signInContainer' style={{backgroundImage: "url(./assets/fondoForm.jpg)"}}>
            <Header />   
            <Form className='formUsers'>
                <h1 className='titleLog'>Sign In</h1>
                <Form.Group /* controlId="formBasicEmail" */>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className='inputUsers' type="email" name='email' placeholder="Enter email" value={userLog.email} onChange={readInput} required />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group /* controlId="formBasicPassword" */>
                    <Form.Label>Password</Form.Label>
                    <Form.Control className='inputUsers' type="password" name='password' placeholder="Password" value={userLog.password} onChange={readInput} required/>
                </Form.Group>
                <Button className='btnLogIn' variant="primary" type="submit" onClick={logInOk}>
                    Log in!
                </Button>
                <GoogleLogin clientId="860204804144-du4bstlj54sf85itor2r56drhgqp0nuh.apps.googleusercontent.com" 
                    buttonText="Log In with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    />
                <div className='logIn'>
                    <p>Already don´t have an account?</p>
                    <NavLink to="/signup"><h2>Sign Up!</h2></NavLink> 
                </div>  
            </Form>                               
            <Footer />
        </ div>
        )    
}

const mapDispatchToProps = {
    loguearUsuario: usersActions.loguearUsuario
}

export default connect(null, mapDispatchToProps) (LogInUsers)