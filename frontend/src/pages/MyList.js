import React from "react"
import { connect } from "react-redux"
import profileActions from "../redux/actions/profileActions"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Lastest from "../components/Lastest"
import Loader from "../components/Loader"
import { Link } from "react-router-dom"


class MyList extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    state={
        myFavourites:null,
        filtered:[],
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

        if (this.state.myFavourites === null || !this.props.selectedProfile ) {
            return <Loader/>
        } 
         
        return(
            <div>
                <Header filter={ this.filter }  props={this.props.history}/>
                {  typeof this.state.filtered === "object" && this.state.filtered.length > 0                          
                    ? <div className="carouselBannerless">
                            <Lastest title={ "Results" } array={ this.state.filtered } /> 
                      </div>   
                            : !this.state.filtered                             
                                ?   <div className="carouselBannerless"> 
                                        <div className="noResultsFounded">
                                            <h1 className="noResults">No results founded.</h1>
                                        </div>
                                    </div>  
                                :  this.state.myFavourites.length !== 0 
                                    ?  <div className="carouselBannerless">
                                            <Lastest title={ "Your List" } array={ this.state.myFavourites } />
                                    </div>
                                    :  <div className="noFilmsInList">
                                            <h1>Your List is empty!</h1>
                                            <h2>Put some Titles here!</h2>
                                            <Link to="/" className="btn btn-hover">
                                                <span>Back to Home</span>
                                            </Link>
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
