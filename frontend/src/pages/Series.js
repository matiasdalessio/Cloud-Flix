import React from "react"


class Series extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    
    render() {
         
        return(
            <div>
                    <h1>Series</h1>
            </div>        
        )
    }
}

export default Series
