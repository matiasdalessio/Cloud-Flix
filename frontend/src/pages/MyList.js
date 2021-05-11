import React from "react"


class MiList extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    
    render() {
         
        return(
            <div>
                    <h1>MiList</h1>
            </div>        
        )
    }
}

export default MiList
