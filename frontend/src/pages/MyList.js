import React from "react"
import { connect } from "react-redux"
import Header from "../components/Header"
import profileActions from "../redux/actions/profileActions"


class MyList extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    state={
        movies: ""
    }

    componentDidMount(){
        this.props.getMoviesOnList(this.props.selectedProfile._id)        
    }

    
    render() {
         
        return(
            <div>
                <Header/>
                    <h1>MiList</h1>
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
