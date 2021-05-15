import React from "react"
import Header from "../components/Header"


class Audiovisual extends React.Component{
    render() {
        return(
            <div>
                <Header/>
                <h1>hola soy {this.props.match.params.id}</h1>
            </div>     
        )
    }
}

export default Audiovisual