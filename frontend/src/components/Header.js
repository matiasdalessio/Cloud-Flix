import { useState } from "react"
import { Link } from "react-router-dom"

const Header = ()=>{
    const [ visible, setVisible ] = useState(false)
    const [ item, setItem ] = useState("")

 return  <div className="nav-wrapper">
            <div className="container">
                <div className="nav">
                    <Link to="/" className="logo">
                        <i className='bx bx-movie-play bx-tada main-color'></i>Cloud<span className="main-color">Flix</span>
                    </Link>
                    <ul className={ visible ? "nav-menu active " : "nav-menu" } id="nav-menu">
                    <li>
                            <div className="searchContainer">
                                <form role="search" >
                                <label htmlFor="s">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className ="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                                </label>
                                <input type="text" onChange={ e => setItem( e.target.value ) } placeholder="Search" className="" id="s" />
                                </form>
                            </div>
                        </li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/popular">Popular</Link></li>
                        <li><Link to="/movies">Movies</Link></li>
                        <li><Link to="/series">Series</Link></li>
                        <li><Link to="/mylist" >Mylist</Link></li>
                        <li>
                            <Link to="/signin" className="btn btn-hover">
                                <span>Sign in</span>
                            </Link>
                        </li>
                    </ul>
                        {/*  Mobile menu */}
                    <div className={ visible ? "hamburger-menu active" : "hamburger-menu" } onClick={ ()=> setVisible( !visible ) } id="hamburger-menu">
                        <div className="hamburger"></div>
                    </div>
                </div>
            </div>
        </div>
}

export default Header
