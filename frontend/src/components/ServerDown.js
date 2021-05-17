import { Link } from "react-router-dom"

const ServerDown = () => {
    return (
        <div className="serverDown">
            <h1>Sorry, servers are down, come back later!</h1> 
            <ul className="nav-menu" id="nav-menu">
                <li>
                    <Link to="/" className="btn btn-hover">
                        <span>Try Again!</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default ServerDown