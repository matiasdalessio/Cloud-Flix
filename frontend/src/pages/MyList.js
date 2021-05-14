import React from "react"
import { connect } from "react-redux"
import profileActions from "../redux/actions/profileActions"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Lastest from "../components/Lastest"


class MyList extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    state={

        movies: "",
      myFavourites:[],
        filtered:[]
    }

    componentDidMount(){
        this.props.getMoviesOnList(this.props.selectedProfile._id)        
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

const mapStateToProps = state => {
  return {
      userLogged: state.user.userLogged,
      selectedProfile: state.profile.selectedProfile
  }
}
const mapDispatchToProps = {
    getMoviesOnList :  profileActions.getMoviesOnList,
}


export default connect(mapStateToProps, mapDispatchToProps)(MyList)
