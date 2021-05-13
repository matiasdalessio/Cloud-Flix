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
                {/* <Lastest title={'Movies'} array={ this.array1 } />
                <Lastest title={'Series'} array={ this.array1} /> */}
                <Footer/>
            </div>        
        )
    }
}

export default Home
