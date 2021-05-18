import React, { useState } from 'react'
import Header from '../components/Header'
import usersActions from '../redux/actions/usersActions.js'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import swal from 'sweetalert'

const Login = (props) =>{

    const [userLog, setUserLog] = useState({email:'', password:''})

    const readInput = (e) =>{
        const field= e.target.name
        const value= e.target.value
        setUserLog({
            ...userLog,
            [field]: value
        })
    }   

    
    const send = async (e = null, userGoogle = null) => {
        e && e.preventDefault()
        let user = e ? userLog : userGoogle
        const response = await props.logUser(user)
        if (!response) {
            return props.history.push('/serverdown')          
        } else if (response.error) {
            swal(response.error, "Verify and try again!", "error")
        } else if (response.premium === false) { 
            return props.history.push('/pricing')
        }
    }
    
    const responseGoogle = (response) => {
        if (response.profileObj.email){
            send(null, {email: response.profileObj.email, password: "asd"+response.profileObj.googleId, country: "null"})
        }
      }

      const filter = ()=>{}

    const enterToSend = ((e) =>{
      e.key === 'Enter' && send()    
    })  
    
    return (<>
        <Header  filter={ filter } />
        <div className='siteContainerLogInEma' style={{backgroundImage:'url("https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2018/06/series-netflix.jpg")'}}>
            <div className='divContainerLogInEma'>
                <h1 className='titleFormRegister'>Log In</h1>
                <form>
                    <input type='text' className='inputFormRegister' onKeyPress={(e)=> enterToSend(e)} placeholder='E-mail' value={userLog.email} name='email' onChange={(e) => readInput(e)} autoComplete='username' ></input>
                    <input type='password' className='inputFormRegister' onKeyPress={(e)=> enterToSend(e)} placeholder='Password' value={userLog.password} name= 'password' onChange={(e) =>readInput(e)} autoComplete="current-password"></input>
                    <p className='botonFormRegister' onClick={send}>Log In</p>
                    
                </form>
                <GoogleLogin
                    clientId="964647088396-9mpm3qcnc13aubmludckjd8lg2bfr9s3.apps.googleusercontent.com"
                    render={renderProps => (
                        <button className="googleButton" onClick={renderProps.onClick} disabled={renderProps.disabled}><svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>Log In with Google</button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <p className='callToActionForm'>New to CloudFlix?<NavLink to="/signup"><span className='reedirectFormRegister'>Sign Up</span></NavLink></p>
            </div>
        </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        userLogged: state.user.userLogged,
        userProfiles: state.profile.userProfiles,
    }
  }
const mapDispatchToProps = {
    logUser: usersActions.logUser
}

export default connect(mapStateToProps, mapDispatchToProps) (Login)