import React from "react"
import Carrousel from "../components/Carrousel"
import Footer from "../components/Footer"


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
                    <Footer/>
            </div>        
        )
    }
}

export default Home
