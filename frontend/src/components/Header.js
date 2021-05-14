import { useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import usersActions from "../redux/actions/usersActions"
import { FaPlayCircle } from "react-icons/fa";
import profileActions from "../redux/actions/profileActions";
import audiovisualActions from "../redux/actions/audiovisualActions";

const Header = ({ allProfiles, profile, userLogged, unselectProfile, userLogout, filter = null, actorFilter = null }) => {


    const [visible, setVisible] = useState(false)
    const [dropdown, setDropdown] = useState(false)

    const menuDropdown = () => {
        setDropdown(!dropdown)
    }

    /* const [ item, setItem ] = useState("") */

    const logOut = () => {
        userLogout()
        unselectProfile()
    }

    return (
        <>
            <div className="animate__animated animate__fadeInDown nav-wrapper">
                <div className="container">
                    <div className="nav">
                        <Link to="/" className="logo">
                            <i className='bx bx-movie-play bx-tada main-color'></i>Cl<FaPlayCircle className="playIcon" />ud<span className="main-color">Flix</span>
                        </Link>
                        <ul className={visible ? "nav-menu active " : "nav-menu"} id="nav-menu">
                            <li>
                                <div className="searchContainer">
                                    <form role="search" >
                                        <label htmlFor="s">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                            </svg>
                                        </label>
                                        <input type="text" onChange={e => filter(e.target.value)} placeholder="Search" className="" id="s" />
                                    </form>
                                </div>
                            </li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/popular">Popular</Link></li>
                            <li><Link to="/movies">Movies</Link></li>
                            <li><Link to="/series">Series</Link></li>
                            {localStorage.getItem('token')
                                ? <li><Link to="/mylist" >Mylist</Link></li>
                                : null}
                            {localStorage.getItem('token') ?
                                <div className="dropdown">
                                    <div onClick={menuDropdown} className="userLogged" style={{ backgroundImage: `url(${profile.avatar})` }}></div>
                                    <img style={{ width: '12px', height: '12px' }} src="/images/ordenar-abajo.png" alt="" />
                                    {
                                        dropdown && <div className="dropdownMenu">
                                            <div className="divAvatars">
                                                {
                                                    allProfiles.map(profiled =>
                                                        <>
                                                            <div
                                                                className={profile._id === profiled._id ? "avatarProfileSelected" : "avatarProfile"}
                                                                style={{ backgroundImage: `url(${profiled.avatar})` }}>
                                                            </div>
                                                            <div className="nameProfile">
                                                                <p>{profiled.name}</p>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </div>
                                            <div className="settings">
                                                <img style={{ width: '30px' }} src="/images/settings.png" alt="" />
                                            </div>
                                            <div onClick={logOut} className="logout">LOG OUT</div>
                                        </div>
                                    }
                                </div>
                                : <li>
                                    <Link to="/login" className="btn btn-hover">
                                        <span>Start!</span>
                                    </Link>
                                </li>}
                        </ul>
                        {/*  Mobile menu */}
                        <div className={visible ? "hamburger-menu active" : "hamburger-menu"} onClick={() => setVisible(!visible)} id="hamburger-menu">
                            <div className="hamburger"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.user.userLogged,
        profile: state.profile.selectedProfile,
        allProfiles: state.profile.userProfiles
    }

}
const mapDispatchToProps = {
    userLogout: usersActions.userLogout,
    unselectProfile: profileActions.unselectProfile,
    actorFilter: audiovisualActions.actorFilter

}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
