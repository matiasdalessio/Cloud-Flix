import { FaPlayCircle } from "react-icons/fa"

const Loader = ()=>{

 return (
    <div className="preloader">
        <i className='bx bx-movie-play bx-tada main-color'></i>Cl<FaPlayCircle className="playIcon"/>ud<span className="main-color">Flix</span>
        <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
        </div>
    </div>
    )
}

  
  export default Loader
