import React from "react"
import { connect } from "react-redux"
import profileActions from "../redux/actions/profileActions"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Lastest from "../components/Lastest"
import Loader from "../components/Loader"


class MyList extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    state={
        myFavourites:null,
        filtered:[],
        profile: this.props.selectedProfile
    }

    componentDidMount(){
        this.props.getMoviesOnList(this.props.selectedProfile._id)
        .then(data => this.setState({...this.state, myFavourites: data.map(audiovisual => {
            return audiovisual.audiovisualId
        })}))

    }
      

    filter = (item)=>{
        item.length === 0 
        ? this.setState({ ...this.state, filtered:[] })
        : this.setState({ ...this.state, 

        filtered: this.state.myFavourites.filter( element => element.title.toLowerCase().trim().includes( item )  ).length > 0
        ? this.state.myFavourites.filter( element => element.title.toLowerCase().trim().includes( item ) )
        : false
        })
    }


    render() {

        if (this.state.myFavourites === null ) {
            return <Loader/>
        } 
         
        return(
            <div>
                <Header filter={ this.filter } />
                {  typeof this.state.filtered === "object" && this.state.filtered.length > 0                          
                    ? <Lastest title={ "Results" } array={ this.state.filtered } />    
                            : !this.state.filtered                             
                                ?  <div className="noResults">
                                         <h1>There are no results</h1>
                                    </div>    
                                :  <>
                                        <Lastest title={ "Your List" } array={ this.state.myFavourites } />
                                   </>
                 }
                 {this.state.myFavourites.length === 0 &&
                 <div className="noFilmsInList">
                     <h1>Your List is empty!</h1>
                     <h2>Put some Titles here!</h2>
                 </div>
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
