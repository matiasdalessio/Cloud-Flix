import React from "react"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Lastest from "../components/Lastest"


class Home extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    array1=[
        {
            id: 1,
            image: '/images/slide1.jpg',
            imageBg: '/images/slide1b.webp',
            title: '1983'
          },
          {
            id: 2,
            image: '/images/slide1.jpg',
            imageBg: '/images/slide1b.webp',
            title: '1983'
          },
    ]

    
    render() {
         
        return(
            <div>
                <Hero />
                <Lastest title={'Movies'} array={ this.array1 } />
                <Lastest title={'Series'} array={ this.array1} />
                <Footer/>
            </div>        
        )
    }
}

export default Home
