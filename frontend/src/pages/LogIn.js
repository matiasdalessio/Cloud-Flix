import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import usersActions from '../redux/actions/usersActions.js'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';

const LogIn = (props) => {   
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
        props.userLogged(user)
    }

    const responseGoogle = (response) => {
        if (response.profileObj.email){
            logInOk(null, {email: response.profileObj.email, password: "asd"+response.profileObj.googleId})
        }
      }

    return(
        <div className='logInContainer' style={{backgroundImage: "url(./assets/fondoForm.jpg)"}}>
            <Header /> 
            <form className='formUsers'>
                <h1 className='titleLog'>Log In</h1>   
                <input className='inputUsers' type='email' name='email' placeholder='Please, enter your email address' value={userLog.email} onChange={readInput} required></input>
                <input className='inputUsers' type='password' name='password' placeholder='Please, enter your password' value={userLog.password} onChange={readInput} required></input>
                
                <input className='btnLogIn' type="button" value="Log In!" onClick={logInOk}></input>
                <GoogleLogin clientId="860204804144-du4bstlj54sf85itor2r56drhgqp0nuh.apps.googleusercontent.com" 
                buttonText="Log In with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                />
                <div className='signUp'>
                    <p>Already have an account?</p>
                    <NavLink to="/signup"><h2>Sign Up!</h2></NavLink> 
                </div>
            </form>
            <Footer />         
        </ div>
        )    
}

const mapDispatchToProps = {
    userLogged: usersActions.userLogged
}

export default connect(null, mapDispatchToProps) (LogIn)