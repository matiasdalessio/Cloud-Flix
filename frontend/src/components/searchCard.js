import { useState } from "react"
import Content from "../components/NetflixSlider/Content"


const SearchCard = ({ data, canOpen , value })=>{
    const [ visible , setVisible ] = useState(false)


    const visibleCard = ()=>{
        if( !value ){
            canOpen() 
            setVisible( !visible)
        }
    
    }

    const onClose = () =>{
        canOpen()
         setVisible( false )
    }

return <div className="searcContainer">

        <div className="results" onClick={ visibleCard }
            key={ data._id } style={{  backgroundImage:`url('${ data.imageBanner }')` }} >
        </div> 

        <div className={ visible ? "d-block cardBusqueda": "d-none" }>
            <Content movie={ data } onClose={ onClose }  />
        </div>

         </div>
}


export default SearchCard