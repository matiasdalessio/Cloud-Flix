import React from "react"
import Carrousel from "../components/Carrousel"


class Home extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    
    render() {
         
        return(
            <div>
                    <Carrousel />
            </div>        
        )
    }
}

export default Home
