import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import usersActions from '../redux/actions/usersActions.js'
import {connect} from 'react-redux'
import { GoogleLogin } from 'react-google-login'; 
import Header from '../components/Header'

const SignUp = (props) =>{
    const [newUser, setNewUser] = useState({email: '', password:'', country:'', premium: false})
    const [countrySelect, setCountrySelect] = useState([])
    
    useEffect(()=>{        
            axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountrySelect(response.data))
            .catch(error => console.log(error))
    },[])

    const readInput = e =>{
        const campo = e.target.name
        const valor = e.target.value
        setNewUser({
            ...newUser,
            [campo]: valor
        })
    }
    
    const signUpOk = async (e = null, googleUser = null) => {
        e && e.preventDefault()
        let user = e ? newUser : googleUser
        props.loadUser(user)
    }

    const responseGoogle = (response) => {
        const {email, googleId, premium} = response.profileObj
        signUpOk(null, {email, password: "asd"+googleId, country: "Nothing", premium})         
      }


    return (<>
        <Header />
        <div className='siteContainerLogInEma' style={{backgroundImage:'url("https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2018/06/series-netflix.jpg")'}}>
            <div className='divContainerLogInEma'>
                <h1 className='titleFormRegister'>Sign Up</h1>
                <form>
                    <input type='text' className='inputFormRegister' name='email' placeholder='Please, enter your email address' value={newUser.email} onChange={readInput}></input>
                    <input type='password' className='inputFormRegister' name='password' placeholder='Please, enter your password' value={newUser.password} onChange={readInput}></input>
                    <select className='inputFormRegister' name='country' value={newUser.country} onChange={readInput}>
                        <option>Select country</option>
                            {countrySelect.map((country, id)=> {
                                return(
                                    <option key={id} value={country.name}>{country.name}</option>
                                )
                            })} 
                    </select>
                    <p className='botonFormRegister' value="Sign up!" onClick={signUpOk} >Sign Up</p>
                </form>
                <GoogleLogin
                    clientId="706728189535-gkdltcou7njsjagcfhn30q0i25g7f30v.apps.googleusercontent.com"
                    render={renderProps => (
                        <button className="googleButton" onClick={renderProps.onClick} disabled={renderProps.disabled}><svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>Sign up with Google</button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <p className='callToActionForm'>Already account to CloudFlix?<NavLink to="/login"><span className='reedirectFormRegister'>Sign In</span></NavLink></p>
            </div>
        </div>
        </>
    )
}
const mapDispatchToProps = {
    loadUser: usersActions.loadUser
}

export default connect(null, mapDispatchToProps)(SignUp)
