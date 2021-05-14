import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Lastest from "../components/Lastest"

class MiList extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    state={
        myFavourites:[],
        filtered:[]
    }

    filter = (item)=>{
        item.length === 0 
        ? this.setState({ ...this.state, filtered:[] })
        : this.setState({ ...this.state, 

        filtered: this.state.myFavourites.filter( element => element.title.toLowerCase().trim().indexOf( item ) === 0 ).length > 0
        ? this.state.myFavourites.filter( element => element.title.toLowerCase().trim().indexOf( item ) === 0 )
        : false
        })
    }

    render() {
         
        return(
            <div>
                <Header filter={ this.filter } />

                {  typeof this.state.filtered === "object" && this.state.filtered.length > 0 
                            
                    ? <Lastest title={ "Resutls" } array={ this.state.filtered } />
    
                            : !this.state.filtered 
                            
                                ?  <div className="noResults">
                                         <h1>There are no results</h1>
                                    </div>
    
                                :  <>
                                        <h1>favourites</h1>
                                   </>
                 }

                <Footer />
            </div>        
        )
    }
}

export default MiList
