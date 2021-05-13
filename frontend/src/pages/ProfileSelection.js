import React from "react"
import { connect } from "react-redux"
import profileActions from "../redux/actions/profileActions"


class ProfileSelection extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    

    state={
        profiles: []
    }

    componentDidMount(){
        let userData = JSON.parse(localStorage.getItem('userLogged'))
        let userLS= {
            token: localStorage.getItem('token'),
            ...userData
        }
        this.props.getUserProfiles(this.props.userLogged.id, userLS)
    }



    
    render() {
        console.log(this.props.userProfiles)
         
        return(
            <div>
                {localStorage.getItem('token') && this.props.userProfiles.length ===0 ?
                <div className="containerProfiles">
                    Create Profile
                        <input type="text" placeholder="name"></input>
                        <input type="text" placeholder="image URL"></input>

                </div>
                :<div className="containerProfiles">
                    Select Profile
                        <div>{this.state.profiles.map(profile => {
                            return <div onClick={() => console.log("elegiste a " + profile.name)} className="profileAvatar" key={profile._id} style={{backgroundImage: `url('${profile.avatar}')`}}>
                            <h3 className="profileName">{profile.name}</h3>
                        </div>
                        })}                            
                        </div>

                </div>
                
                }
                    
            </div>        
        )
    }
}
const mapStateToProps = state => {
  return {
      userLogged: state.user.userLogged,
      userProfiles: state.profile.userProfiles
  }
}
const mapDispatchToProps = {
    getUserProfiles :  profileActions.getUserProfiles,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSelection)
