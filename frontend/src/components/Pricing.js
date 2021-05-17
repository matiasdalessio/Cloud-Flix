import usersActions from "../redux/actions/usersActions"
import { connect } from "react-redux"
import React from "react"
import { Link, NavLink } from "react-router-dom"

const Pricing = ({ selectPlan, userLogged })=>{

    
     
    const changeMembertype = (change) =>{
       const membertype = !change ? false : true
        selectPlan(membertype)
    }


    return(
        <div className="containerPricingCards">
            <div className='pricingCard'>
                <div className='parteDeArribaCard'>
                    <h3>Basic</h3>
                    <h3>Free</h3>
                </div>
                <div className='contenidoDelPaqueteCard'>
                    <h4>Original Content</h4>
                    <h4>Swich plans anytime</h4>
                    <h4 className='textoTachadoCards'>65+ Films</h4>
                    <h4 className='textoTachadoCards'>65+ Tv Programs</h4>
                </div>
                <div className='lugarDelBotonCard'>
                    <p className="btn btn-hover">      
                    <NavLink className="social-item" to="/"></NavLink>     
                     <span onClick={()=> changeMembertype(false)}><NavLink to="/">30 Days free</NavLink></span>
                    </p>
                </div>
            </div>
            <div className='pricingCard borderTopRed'>
                <div className='parteDeArribaCard'>
                    <h3>Premium</h3>
                    <h3>$4.99</h3>
                </div>
                <div className='contenidoDelPaqueteCard'>
                    <h4>Original Content</h4>
                    <h4>Swich plans anytime</h4>
                    <h4>65+ Films</h4>
                    <h4>65+ Tv Programs</h4>
                </div>
                <div className='lugarDelBotonCard'>
                    <p className="btn btn-hover">         
                    <span onClick={()=> changeMembertype(true)}><NavLink to="/">Change to premium</NavLink></span>
                    </p>
                </div>
            </div>
        </div>
    )
}

const  mapStateToProps = state =>{
    return{
        userLogged: state.user.userLogged
    }
}

const mapDispatchToProps ={
    selectPlan:usersActions.selectPlan
}

export default connect(mapStateToProps, mapDispatchToProps ) (Pricing)
