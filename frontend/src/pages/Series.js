import React from "react"
import { connect } from "react-redux"
import seriesAction from "../redux/actions/seriesAction"
import Lastest from "../components/Lastest"

class Series extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    state={
        series:[],
        action:[],
        comedi:[]
    }

    componentDidMount(){
        this.props.fetchSeries()
        .then( data =>{
            this.setState({ ...this.state,
                 series: data,
                 action: data.filter( serie => serie.categories.includes( "Action" ) ),
                 comedy: data.filter( serie => serie.categories.includes( "Comedy" ) )
            })
        })
    }

/* grid series
this.state.series.map( serie =>{ 
return <div key={ serie._id } onClick={ () => this.props.history.push("/audiovisual/" + serie._id) } className="serie" style={{  backgroundImage: `url('${ serie.imageURL }')`  }} >
</div> })
*/


    render() {
        return(
            <div className="seriesContainer">
                {  this.state.action &&
                    <Lastest title={ "Action" } array={ this.state.action } />
                }

                {  this.state.comedy &&
                    <Lastest title={ "Comedy" } array={ this.state.comedy } />
                }
            </div>        
        )
    }
}

const mapDispatchToProps ={
    fetchSeries:seriesAction.fetchSeries
}


export default connect(null, mapDispatchToProps) (Series)
