import React from "react"
import { connect } from "react-redux"
import profileActions from "../redux/actions/profileActions"
import { MdAdd, MdDelete } from "react-icons/md";
import swal from 'sweetalert'
import Loader from "../components/Loader";



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

    userData = JSON.parse(localStorage.getItem('userLogged'))
    userLS= {
        token: localStorage.getItem('token'),
        ...this.userData
    }

    selectProfile = (profile) => {
        this.props.profileSelected(profile)
        this.props.history.push('/')
    }

    createProfile = async () => {
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
            this.props.getUserProfiles(this.props.userLogged.id, this.userLS)
            this.props.history.push('/')
        }   
    }
    options = (profileId)=> swal("Want to delete this profile?", {
        buttons: {
          Delete: {text: "Delete", value: "delete"},
          cancel: "Cancel",
        },
      })
      .then((value, willDelete) => {
        switch (value) {         
          case "delete":
            swal({
              title: "Your comment will be deleted...",
              text: "Are you sure?",
              icon: "warning",
              buttons: ["Nope", "I'm Sure!"],
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                  this.props.deleteProfile(profileId, this.userLS)
                  swal("Poof! Your comment has been deleted!", {
                      icon: "success",
                });
              } else {
                swal("Okay! We'll keep it alive then");
              }
            });                
            break           
          default:           
        }
      })
    
    render() {
        this.props.userProfiles === null && <Loader/>
        return(
            <div>
                {this.state.creating 
                ?<div className="containerProfiles">
                        <h1 className='h1AddProfile'>Add Profile (max 5)</h1>
                        <h3 className='h3AddProfile'>Add a profile for other person Watching CloudFlix</h3>
                        <hr className='separacionConHr'/>
                        <div className="formProfile">
                            <div className='avatarPredeterminadoDiv' style={{backgroundImage:'url("https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png")'}}></div>
                            <div className='infoPerfilCreate'>
                                <label className='labelCreatePerfil' htmlFor="name">Tell us Who you are!</label>
                                <input className='inputCreatePerfil' type="text" placeholder="Name" id="name" name="name" onChange={this.readInput} value={this.state.newProfile.name}></input>
                                <label className='labelCreatePerfil' htmlFor="avatar">Post a pic of you in URL</label>
                                <input className='inputCreatePerfil' type="text" placeholder="Image URL" id="avatar"name="avatar" onChange={this.readInput} value={this.state.newProfile.avatar}></input>
                            </div>
                        </div>
                        <div className='showContentPrefile'>
                            <h3 className='h3showContentPrefile'>Show content for:</h3>
                            <div className="divContent">
                                <label htmlFor="adults" className="l-radio">
                                    <input type="radio" id="adults" name="content" value="false" onChange={(e) => this.setContent(e)} tabIndex="1"></input>
                                    <span>Adults</span>
                                </label>
                                <label htmlFor="kids" className="l-radio">
                                    <input type="radio" id="kids" name="content" value= "true" onChange={(e) => this.setContent(e)} tabIndex="2"></input>
                                    <span>Kids</span>
                                </label>
                            </div>
                        </div>
                        <div className='containerButtonsCreateProfile'>
                            <button className='continueCreateProfile' onClick={this.send}>CONTINUE</button>
                            <button className='cancelCreateProfile' onClick={() => this.finishEdit()}>CANCEL</button>
                        </div>                      
                 </div>
                :<div className="containerProfiles">
                        <h1 className="tittleProfiles">Select Profile</h1>  
                        <div className="profileOptions">                
                            {this.props.userProfiles.map(profile => {
                                return  <div className="divProfileAvatar" key={profile._id}>
                                            <div onClick={() => this.selectProfile(profile)} className="profileAvatar"  style={{backgroundImage: `url('${profile.avatar}')`}}>                                          
                                                        <h3 className="profileName">{profile.name}</h3>
                                            </div>
                                            <MdDelete className="deleteIcon" onClick={(e)=> this.options(profile._id) }/>  
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
    createProfile: profileActions.createProfile,
    deleteProfile: profileActions.deleteProfile,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSelection)
