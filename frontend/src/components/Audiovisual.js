import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import Header from "../components/Header"
import Footer from "../components/Footer"
import audiovisualActions from '../redux/actions/audiovisualActions'
import { NavLink } from "react-router-dom"
import { Player } from 'video-react';
import commentAction from '../redux/actions/commentAction'
import Comment from "./Comment"
import { ToastContainer, toast } from 'react-toastify';

const Audiovisual = (props) => {

    const [video, setVideo] = useState({})
    const [comment, setComment] = useState({ comment: "", token: localStorage.getItem('token') })
    const [renderComment, setRenderComment] = useState([])
    const [seasons, setSeasons] = useState([])
    const [legitimateUser, setLegitimateUser] = useState(false)

    const toTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    const readInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        setComment({
            ...comment,
            [name]: value
        })
    }

    useEffect(() => {
        toTop()
        fetchVideos()
        fetchSeasons()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchVideos = async () => {
        const response = await props.fetchAudiovisuals()
        if (response) {
            const audioVisuals = response.find(audiovisual => audiovisual._id === props.match.params.id)
            setVideo(audioVisuals)
            setRenderComment(audioVisuals.comments)
        }
    }

    const fetchSeasons = async () => {
        const response = await props.fetchSeasons(props.match.params.id)
        if (response) {
            setSeasons(response)
        }
    }

    const addComment = async (e) => {
        e.preventDefault()
        if (/^\s+|\s+$/.test(comment.comment) || comment.comment === "") {
            toast.error("You cannot post an empty comment")
        } else {
            var response = await props.fetchComments(comment, video._id, props.profile.avatar, props.profile.name)
            if (response) {
                setRenderComment(response)
                setComment({ comment: "", token: localStorage.getItem('token') })
            }
        }
    }

    const deleteComment = async (id) => {
        var response = await props.deleteComment(id, video._id)
        setRenderComment(response)
    }

    return (
        <div className="divVideo">
            <Header />
            <div className="bannerAudiovisualU" style={{ backgroundImage: `url(${video.imageBackground})` }}>
                <h1>{video.title}</h1>
            </div>
            <div className='containerCompVideo'>
                <NavLink to="/"><h1>Back to Home</h1></NavLink>
                <div className='containerVideo'>
                    <Player className='videoCompVideoPlayer'
                        playsInline
                        poster="/images/logoCloudFlix.png"
                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    />
                </div>
            </div>
            {
                video.audiovisualType === "Serie" ?
                    <div className="seasonsConteiner">
                        {
                            seasons.map(season => {
                                return (
                                    <div>
                                        <p className="seasonNumber" >SEASON {season.numberSeason}</p>
                                        {
                                            season.chapters.map(chapter => {
                                                return (
                                                    <div className="chapters">
                                                        <p>{chapter.title}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div> : null
            }
            {
                props.userLogged &&
                <>
                    <div className="textTareaConteiner">
                        <div className="avatarComment">
                            <div style={{backgroundImage: `url(${props.profile.avatar})`}} className="avatarImgComment"></div> 
                            <p>{props.profile.name}</p>
                        </div>
                        <textarea className="textInput" onChange={readInput} value={comment.comment} name="comment" placeholder="Hello!" required />
                    </div>
                    <div className="divSend">
                        <button className="buttonSend" onClick={addComment}>send</button>
                    </div>
                </>
            }

            <div className="commentsVideo">
                {
                    renderComment.map(comment => <Comment
                        comment={comment}
                        deleteComment={deleteComment}
                        legitimateUser={legitimateUser}
                        setLegitimateUser={setLegitimateUser}
                        userLogged={props.userLogged}
                    />)
                }
            </div>
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            <Footer />
        </div>
    )

}

const mapStateToProps = state => {
    return {
        listAudiovisual: state.audiovisual.allAudiovisual,
        profile: state.profile.selectedProfile,
        userLogged: state.user.userLogged,
    }
}

const mapDispatchToProps = {
    fetchAudiovisuals: audiovisualActions.movies,
    fetchComments: commentAction.fetchComments,
    deleteComment: commentAction.deleteComment,
    fetchSeasons: audiovisualActions.fetchSeasons
}

export default connect(mapStateToProps, mapDispatchToProps)(Audiovisual)