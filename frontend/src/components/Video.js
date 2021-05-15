import { NavLink } from "react-router-dom"
import { Player } from 'video-react';

const Video = ()=>{
    return(
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
    )
}
export default Video