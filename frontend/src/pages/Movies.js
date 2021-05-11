import React from "react"


class Movies extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    
    render() {
         
        return(
            <div>
                    <h1>Movies</h1>
            </div>        
        )
    }
}

export default Movies
