import React, { Component } from "react";
import FlightList from "./FlightList";
import API from "../../utils/API";
import "./SearchResultContainer.css";
import AddFlightModal from "./AddFlightModal";
import Sidebar from '../Sidebar/Sidebar';
import Backdrop from '../Backdrop/Backdrop';
import SidebarToggleButton from "../Sidebar/SidebarToggleButton";
import './SearchResultContainer.css';


// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   Redirect
// } from "react-router-dom"

class SearchResultContainer extends Component {
  state = {
      results: [],
      sideBarOpen: false
  };

  // When this component mounts, search the Giphy API for pictures of kittens
  componentDidMount() {
    API.getFlightsForUser(this.props.user_id)
    .then(res => {
      console.log(res.data);
      this.setState({ results: res.data});
    })
    .catch(err => console.log(err));
  }

  getlatestFlights =id => {
    API.getFlightsForUser(id)
    .then(res => {
      console.log(res.data);
      this.setState({ results: res.data});
    })
    .catch(err => console.log(err));
  }
  
  sideBarToggleClickHandler = () =>{
    console.log("Button Works")
    this.setState((prevState) => {
      return {sideBarOpen: !prevState.sideBarOpen};
    })}

  backdropClickHandler = () =>{
    this.setState({sideBarOpen: false});
  }

  addAllFlights = resultArr =>{
    let totalHours = 0;
    for(let i=0; i< resultArr.length;i++){
      totalHours+= resultArr[i].flight_day
    }
    return totalHours;
  }

  render() {

    //added 10/9
    //const { component: Component, ...props } = this.props
    let backdrop;
    if(this.state.sideBarOpen){
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }

    if(this.state.results.length > 0){
      console.log(this.state.results[0].flight_day)
    }
    return (
      <div>
          <div className="sidebar_navigation">
            <SidebarToggleButton click={this.sideBarToggleClickHandler}/>
            <Sidebar show={this.state.sideBarOpen} 
            // totalhours
            totalHours={
              this.state.results.length > 0?this.addAllFlights(this.state.results):"No flights found"}
              />
              {/* Add the following */}
            {/* hours remaining till license min of 40 */}
            {/* last flight remarks
            last flight time
            last flight aircraft
            last flight takeoff from
            last flight land in */}
            {backdrop}
          </div>
           {
                this.state.results.length === 0 ? 
                  (<h3> No flights found!</h3>)
                  :
                  (
                  
                    <FlightList 
                      results={this.state.results} 
                        
                    />
                  )   

              }

        <div id ="footer">
              <AddFlightModal 
                pilot = {this.props.user_id}
                latest = {this.getlatestFlights}
                />
        </div> 
      </div>
    );
  }
}

export default SearchResultContainer;
