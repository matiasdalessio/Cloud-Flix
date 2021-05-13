import React from "react"
import Carrousel from "../components/Carrousel"
import Footer from "../components/Footer"
<<<<<<< HEAD
import Lastest from "../components/Lastest"
import seriesAction from "../redux/actions/seriesAction"
import { connect } from "react-redux"
=======
// import Lastest from "../components/Lastest"
import seriesAction from "../redux/actions/seriesAction"
import { connect } from "react-redux"
import Header from "../components/Header"
>>>>>>> c7fa1d4ec377de52e4d7d8783dacce9f9f63de57


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
<<<<<<< HEAD
                <Carrousel />
                <Lastest Lastest={'Movies'}/>
                <Lastest Lastest={'Series'}/>
=======
                <Header/>
                <Carrousel />
                {/* <Lastest title={'Movies'} array={ this.array1 } />
                <Lastest title={'Series'} array={ this.array1} /> */}
>>>>>>> c7fa1d4ec377de52e4d7d8783dacce9f9f63de57
                <Footer/>
            </div>        
        )
    }
}
const mapDispatchToProps ={
    fetchSeries: seriesAction.fetchSeries,
}

export default connect(null, mapDispatchToProps) (Home)
