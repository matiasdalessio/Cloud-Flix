import React from "react"
import Carrousel from "../components/Carrousel"
import Footer from "../components/Footer"
import Lastest from "../components/Lastest"
import seriesAction from "../redux/actions/seriesAction"
import { connect } from "react-redux"


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
                <Carrousel />
                <Lastest Lastest={'Movies'}/>
                <Lastest Lastest={'Series'}/>
                <Footer/>
            </div>        
        )
    }
}
const mapDispatchToProps ={
    fetchSeries: seriesAction.fetchSeries,
}

export default connect(null, mapDispatchToProps) (Home)
