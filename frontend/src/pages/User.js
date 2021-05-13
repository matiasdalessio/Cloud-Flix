import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LogIn from "./LogIn"
import SignUp from './SignUp'

class User extends React.Component{
    render() {
        return(
            <div className='principalContainer'>
                <Header />
                <div className='userContainer'>
                    <LogIn />
                    <SignUp />
                    <div className='overlay-container'>
                    <div className='overlay'>
                        <div className='overlay-panel overlay-left'>
                            <h2>Welcome Back!</h2>
                            <p>
                                To keep connected with us please login with your personal info
                            </p>
                            <button className='ghost' id='signIn'>Sign In</button>
                        </div>
                        <div className='overlay-panel overlay-right'>
                            <h2>Hello, Friend!</h2>
                            <p>Enter your personal details and start journey with us</p>
                            <button className='ghost' id='signUp'>Sign Up</button>
                        </div>
                    </div>
                </div>
                </div>
                
                <Footer />
            </ div>

        )
    }
}

export default User