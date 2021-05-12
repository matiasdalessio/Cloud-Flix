import React from "react"


class Audiovisual extends React.Component{
    render() {
        return(
            <div>
                <h1>hola soy {this.props.match.params.id}</h1>
            </div>     
        )
    }
}

export default Audiovisual