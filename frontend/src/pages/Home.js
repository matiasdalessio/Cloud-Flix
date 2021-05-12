import React from "react"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
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
                <Hero />
                <Lastest Lastest={'Movies'}/>
                <Lastest Lastest={'Series'}/>
                <Footer/>
            </div>        
        )
    }
}

export default Home
