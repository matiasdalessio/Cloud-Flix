import React from "react"
import Header from "../components/Header"


class MiList extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    
    render() {
         
        return(
            <div>
                <Header/>
                    <h1>MiList</h1>
            </div>        
        )
    }
}

export default MiList
