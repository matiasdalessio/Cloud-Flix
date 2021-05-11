import React from "react"


class Popular extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    
    render() {
         
        return(
            <div>
                    <h1>Popular</h1>
            </div>        
        )
    }
}

export default Popular
