import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import usersActions from '../redux/actions/usersActions.js'
import {connect} from 'react-redux'
/* import { GoogleLogin } from 'react-google-login'; */
/* import { Form, Button, Col, Row } from 'react-bootstrap'; */


const SignUp= (props) => {   
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
        let usuario = e ? newUser : googleUser
        props.cargarUsuario(usuario)
    }

    const responseGoogle = (response) => {
        const {email, googleId, country, premium} = response.profileObj
        signUpOk(null, {email, password: googleId, country: "Nothing", premium})         
      }
    
    return(
        <div className='signUpContainer' style={{backgroundImage: "url(./assets/fondoForm.jpg)"}}>
            <Header />  
            
            <Footer />
        </ div>
        )    
}

const mapDispatchToProps = {
    cargarUsuario: usersActions.cargarUsuario
}

export default connect(null, mapDispatchToProps)(SignUp)


