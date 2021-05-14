import { NavLink } from 'react-router-dom';
import { FaPlayCircle } from "react-icons/fa";
import { connect } from "react-redux"


const Footer = ({ userLogged }) => {
    
    return (
        <>
            <footer className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-4 col-md-6 col-sm-12">
                            <div className="content">
                                <NavLink className="logo" to="/">
                                <i className='bx bx-movie-play bx-tada main-color'></i>Cl<FaPlayCircle className="playIcon"/>ud<span className="main-color">Flix</span>
                                </NavLink>
                                <p>Cloudflix is ​​a streaming service that works by 
                                    subscription and allows its users to watch series and movies without 
                                    ads through any device connected to the internet.</p>
                                <div className="social-list">
                                    <NavLink className="social-item" to="/">
                                        <i className="bx bxl-facebook"></i>
                                    </NavLink>
                                    <NavLink className="social-item" to="/">
                                        <i className="bx bxl-twitter"></i>
                                    </NavLink>
                                    <NavLink className="social-item" to="/">
                                        <i className="bx bxl-instagram"></i>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 col-md-6 col-sm-12">
                            <div className="row">
                                <div className="col-3 col-md-6 col-sm-6">
                                    <div className="content">
                                        <p><b>Flix</b></p>
                                        <ul className="footer-menu">
                                            <li><NavLink to="/">About us</NavLink></li>
                                            <li><NavLink to="/">Pricing plans</NavLink></li>
                                            <li><NavLink to="/">Contacts</NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-3 col-md-6 col-sm-6">
                                    <div className="content">
                                        <p><b>Browse</b></p>
                                        <ul className="footer-menu">
                                        <li><NavLink to="/">Home</NavLink></li>
                                            {/* <li>{ userLogged && <NavLink to="/">My profile</NavLink> }</li> */}
                                            <li><NavLink to="/popular">Popular</NavLink></li>
                                            <li><NavLink to="/movies">Movies</NavLink></li>
                                            <li><NavLink to="/series">Series</NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-3 col-md-6 col-sm-6">
                                   {/*  <div className="content">
                                        <p><b>Help</b></p>
                                        <ul className="footer-menu">
                                            <li><NavLink to="/">About us</NavLink></li>
                                            <li><NavLink to="/">My profile</NavLink></li>
                                            <li><NavLink to="/">Pricing plans</NavLink></li>
                                            <li><NavLink to="/">Contacts</NavLink></li>
                                        </ul>
                                    </div> */}
                                </div>
                                <div className="col-3 col-md-6 col-sm-6">
                                    <div className="content">
                                        <p><b>Download app</b></p>
                                        <ul className="footer-menu">
                                            <li>
                                                <NavLink to="/">
                                                    <img src="/images/google-play.png" alt="" />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/">
                                                    <img src="/images/app-store.png" alt="" />
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="copyright">
                Copyright 2021 | <p className='colorChallengeFooter'>Challenge Grupo 3</p>
            </div>
        </>
    )
}

const mapStateToProps = state =>{
    return{
        userLogged:state.user.userLogged
    }
}



export default connect(mapStateToProps,null)(Footer) 