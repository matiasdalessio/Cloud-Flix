import React from "react"
import Footer from "../components/Footer"


class Home extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    
    render() {
         
        return(
            <>
                <h1>Home</h1>
                <Footer />
            </>        
        )
    }
}

export default Home
