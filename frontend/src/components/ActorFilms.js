import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"

class ActorFilms extends React.Component{    
    render() {
        console.log(this.props)
        return(
            <div>
                <Header filter={ this.filter } />
                <h2>Films of: </h2>

                <Footer/>
            </div>        
        )
    }
}

export default ActorFilms
