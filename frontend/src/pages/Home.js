import React from "react"
import Carrousel from "../components/Carrousel"
import Footer from "../components/Footer"
// import Lastest from "../components/Lastest"
import seriesAction from "../redux/actions/seriesAction"
import { connect } from "react-redux"
import Header from "../components/Header"


class Home extends React.Component{
    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}
    state={
        series:[]
    }
    componentDidMount(){
        this.props.fetchSeries()
        .then( data =>{
            this.setState({ ...this.state, series: data })
        })
    }

    render() {
        return(
            <div>
                <Header/>
                <Carrousel />
                {/* <Lastest title={'Movies'} array={ this.array1 } />
                <Lastest title={'Series'} array={ this.array1} /> */}
                <Footer/>
            </div>        
        )
    }
}
const mapDispatchToProps ={
    fetchSeries: seriesAction.fetchSeries,
}

export default connect(null, mapDispatchToProps) (Home)
