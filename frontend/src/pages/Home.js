import React from "react"
import Carrousel from "../components/Carrousel"
import Footer from "../components/Footer"
import Lastest from "../components/Lastest"


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
                    <Lastest Lastest={'Movies'}/>
                    <Lastest Lastest={'Series'}/>
                    <Footer/>
            </div>        
        )
    }
}

export default Home
