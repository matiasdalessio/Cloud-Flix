import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import usersActions from '../redux/actions/usersActions.js'
import {connect} from 'react-redux'
import { GoogleLogin } from 'react-google-login'; 

const SignUp = (props) => {   
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
        const {email, googleId, country, premium} = response.profileObj
        signUpOk(null, {email, password: googleId, country: "Nothing", premium})         
      }
    
    return(
        <div className='signUpContainer'>
            <form className='formUsers'>
                <h1 className='titleLog'>Sign Up</h1>   
                <input className='inputUsers' type='email' name='email' placeholder='Please, enter your email address' value={newUser.email} onChange={readInput} required></input>
                <input className='inputUsers' type='password' name='password' placeholder='Please, enter your password' value={newUser.password} onChange={readInput} required></input>
                <select className='inputUsers' name='country' value={newUser.country} onChange={readInput}>
                    <option>Select country</option>
                    {countrySelect.map((country, id)=> {
                        return(
                            <option key={id} value={country.name}>{country.name}</option>
                        )
                    })} 
                </select>
                <input className='btnSignUp' type="button" value="Sign up!" onClick={signUpOk}></input>
                <GoogleLogin clientId="860204804144-du4bstlj54sf85itor2r56drhgqp0nuh.apps.googleusercontent.com" 
                    buttonText="Sign Up with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    />
                <div className='logIn'>
                    <p>Already have an account?</p>
                    <NavLink to="/login"><h2>Log In!</h2></NavLink> 
                </div>
            </form>        
            <Footer />
        </ div>
        
    )    
}

const mapDispatchToProps = {
    loadUser: usersActions.loadUser
}

export default connect(null, mapDispatchToProps)(SignUp)


