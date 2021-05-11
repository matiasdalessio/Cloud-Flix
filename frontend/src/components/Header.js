import { useState } from "react"
import { Link } from "react-router-dom"

const Header = ()=>{
    const [ visible, setVisible ] = useState(false)


 return  <div class="nav-wrapper">
            <div class="container">
                <div class="nav">
                    <Link href="#" class="logo">
                        <i class='bx bx-movie-play bx-tada main-color'></i>Fl<span class="main-color">i</span>x
                    </Link>
                    <ul class={ visible ? "nav-menu active " : "nav-menu" } id="nav-menu">
                        <li><Link href="#">Home</Link></li>
                        <li><Link href="#">Genre</Link></li>
                        <li><Link href="#">Movies</Link></li>
                        <li><Link href="#">Series</Link></li>
                        <li><Link href="#">About</Link></li>
                        <li>
                            <Link href="#" class="btn btn-hover">
                                <span>Sign in</span>
                            </Link>
                        </li>
                    </ul>
                        {/*  Mobile menu */}
                    <div class={ visible ? "hamburger-menu active" : "hamburger-menu" } onClick={ ()=> setVisible( !visible ) } id="hamburger-menu">
                        <div class="hamburger"></div>
                    </div>
                </div>
            </div>
        </div>
}

export default Header
