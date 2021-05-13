import React from "react"
import Header from "../components/Header"


class ProfileSelection extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    
    render() {
         
        return(
            <div>
                <Header/>
                    <h1>ProfileSelection</h1>
            </div>        
        )
    }
}

export default ProfileSelection
