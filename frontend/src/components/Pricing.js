import usersActions from "../redux/actions/usersActions"
import { connect } from "react-redux"
import React from "react"

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
                    <h4>Original</h4>
                    <h4>Swich plans anytime</h4>
                    <h4 className='textoTachadoCards'>65+ top live</h4>
                    <h4 className='textoTachadoCards'>Tv Channels</h4>
                </div>
                <div className='lugarDelBotonCard'>
                    <p className="btn btn-hover">                       
                        <span onClick={()=> changeMembertype(false)}>mantain free</span>
                    </p>
                </div>
            </div>
            <div className='pricingCard borderTopRed'>
                <div className='parteDeArribaCard'>
                    <h3>Premium</h3>
                    <h3>$4.99</h3>
                </div>
                <div className='contenidoDelPaqueteCard'>
                    <h4>Original</h4>
                    <h4>Swich plans anytime</h4>
                    <h4>65+ top live</h4>
                    <h4>Tv Channels</h4>
                </div>
                <div className='lugarDelBotonCard'>
                    <p className="btn btn-hover">         
                        <span onClick={()=> changeMembertype(true)}>Change to premium</span>
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
