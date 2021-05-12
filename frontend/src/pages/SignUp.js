import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import usersActions from '../redux/actions/usersActions.js'
import {connect} from 'react-redux'
import { GoogleLogin } from 'react-google-login';
// import { Form, Button, Col, Row } from 'react-bootstrap';


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
            {/* <Header />  
            <Form className='formUsers'>
                <h1 className='titleLog'>Sign Up</h1>
                <Form.Row className='inputUsers'>
                    <Col>
                        <Form.Label>First name</Form.Label>
                        <Form.Control placeholder="First name"  type='text' name='firstName' value={newUser.firstName} onChange={readInput} required/>
                    </Col>
                    <Col>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control placeholder="Last name"  type='text' name='lastName' value={newUser.lastName} onChange={readInput} required />
                    </Col>
                </Form.Row>
                <Form.Row className='inputUsers'>
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" type='email' name='email' value={newUser.email} onChange={readInput} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" type='password' name='password' value={newUser.password} onChange={readInput} required />
                    </Form.Group>
                </Form.Row>

                <Form.Row className='inputUsers'>
                <Form.Group as={Col} controlId="formGridPhoto">
                    <Form.Label>User Photo</Form.Label>
                    <Form.Control placeholder="URL of your picture" type='text' name='photoUser' value={newUser.photoUser} onChange={readInput} required />
                    </Form.Group>
                </Form.Row>

                <Form.Row className='inputUsers'>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Country</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..."  name='country' value={newUser.country} onChange={readInput}>
                        <option>Choose Country...</option>
                        {countrySelect.map((country, id)=> {
                            return(
                                <option key={id} value={country.name}>{country.name}</option>
                            )
                        })}
                    </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit" className='btnSignUp' value="Sign up!" onClick={signUpOk}>
                    Sign Up!
                </Button>
                <GoogleLogin clientId="860204804144-du4bstlj54sf85itor2r56drhgqp0nuh.apps.googleusercontent.com" 
                        buttonText="Sign Up with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        />
                <div className='signIn'>
                    <p>Already have an account?</p>
                    <NavLink to="/signin"><h2>Sign In!</h2></NavLink> 
                </div>
                </Form>
            <Footer /> */}
        </ div>
        )    
}

const mapDispatchToProps = {
    cargarUsuario: usersActions.cargarUsuario
}

export default connect(null, mapDispatchToProps)(SignUp)


