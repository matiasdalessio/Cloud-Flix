import React from "react"
import { connect } from "react-redux"
import profileActions from "../redux/actions/profileActions"
import { MdAdd } from "react-icons/md";
import swal from 'sweetalert'



class ProfileSelection extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}
    

    state={
        profiles: [],
        creating: false,
        newProfile:{
            name: '',
            avatar: '',
            kids: false            
        },       
    }

    componentDidMount(){
        let userData = JSON.parse(localStorage.getItem('userLogged'))
        let userLS= {
            token: localStorage.getItem('token'),
            ...userData
        }
        this.props.getUserProfiles(this.props.userLogged.id, userLS)
    }
    selectProfile = (profile) => {
        this.props.profileSelected(profile)
    }

    createProfile = () => {
        this.setState({...this.state, creating:true})
    }
    readInput = ((e) => {
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            newProfile:{...this.state.newProfile,
            [field]: value}
        })
    })

    finishEdit = () => {
        this.setState({...this.state, creating:false})
    }
    setContent = (e) => {
        
        this.setState({...this.state,
            newProfile:{...this.state.newProfile,
                kids:e.target.value}})
    }
    send = async (e) => {
        e.preventDefault()
        let newProfile= this.state.newProfile
        const respuesta = await this.props.createProfile(newProfile, this.props.userLogged.id)
        if (!respuesta) {
            return alert("oops")
        } else if (respuesta.error) {
            swal(respuesta.error, "Verify and try again!", "error")
        } else {
            this.props.profileSelected(respuesta)
        }   
    }
    
    render() {
        return(
            <div>
                {this.state.creating 
                ?<div className="containerProfiles">
                        <h1>Create Profile</h1>
                        <h3>Add a profile for other person Watching CloudFlix</h3>
                        <div className="formProfile">
                            <label htmlFor="name">Tell us Who you are!</label>
                            <input type="text" placeholder="Name" id="name" name="name" onChange={this.readInput} value={this.state.newProfile.name}></input>
                            <label htmlFor="avatar">Post a pic of you in URL</label>
                            <input type="text" placeholder="Image URL" id="avatar"name="avatar" onChange={this.readInput} value={this.state.newProfile.avatar}></input>
                            <h2>Show content for:</h2>
                            <div className="divContent">
                                <label htmlFor="kids">Kids</label>
                                <input type="radio" name="content" id="kids" onChange={(e) => this.setContent(e)} value= "true" />
                                <label htmlFor="adults">Adults</label>
                                <input type="radio" name="content" id="adults" onChange={(e) => this.setContent(e)} value="false" />
                            </div>
                        </div>
                        <div>
                            <button onClick={this.send}>Continue</button>
                            <button onClick={() => this.finishEdit()}>Cancel</button>
                        </div>


                 </div>
                :<div className="containerProfiles">
                        <h1 className="tittleProfiles">Select Profile</h1>  
                        <div className="profileOptions">                
                            {this.props.userProfiles.map(profile => {
                                return <div onClick={() => this.selectProfile(profile)} className="profileAvatar" key={profile._id} style={{backgroundImage: `url('${profile.avatar}')`}}>
                                            <h3 className="profileName">{profile.name}</h3>
                                    </div>
                            })}
                            {this.props.userProfiles.length<= 4 &&
                            <div onClick={() => this.createProfile()} className="addAvatar" >
                                <MdAdd className="addIcon"/>
                            </div> }                 
                                             
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
      userProfiles: state.profile.userProfiles,
      selectedProfile: state.profile.selectedProfile
  }
}
const mapDispatchToProps = {
    getUserProfiles :  profileActions.getUserProfiles,
    profileSelected:  profileActions.profileSelected,
    createProfile: profileActions.createProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSelection)
