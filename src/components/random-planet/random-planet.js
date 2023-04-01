import React, { Component } from 'react';
import './random-planet.css';
import Loading from '../loading'
import SwapiService from '../../services/swapi-service'
export default class RandomPlanet extends Component {
  Swapi = new SwapiService();
  
  state = {
    location: [],
    text: '',
    loading: true
  }
  componentDidMount() {
    this.updateData();
    setInterval(this.updateData, 5000);
  } 
  onPlanetLoaded = (location) => {
    this.setState({ 
      location,
      loading: false  
    });
  }
  updateData = () => {
    const id = Math.floor(Math.random()*891) + 2;
    this.Swapi.getSomethink("locations", id).then(this.onPlanetLoaded)
  }
  
  render() {
    const { location: {Id, name, created_at}, loading  } = this.state;

    
    if(loading) {
      return <Loading />
    }
    
    return (
      <div className="random-planet jumbotron rounded">
        
        <img className="planet-image"
             src={Id} />
        <div>
          
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            
          </ul>
        </div>
      </div>

    );
  }
}
