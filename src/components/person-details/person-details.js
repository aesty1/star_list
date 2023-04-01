import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import './person-details.css';

export default class PersonDetails extends Component {
  Swapi = new SwapiService();
  state = {
    character: null
  }
  onPlanetLoaded = (character) => {
    this.setState({ 
      character
    });
  }
  componentDidMount() {
    this.updatePerson()
  }
  componentDidUpdate(prevProps) {
    if(this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }
  updatePerson() {
    const { personId } = this.props;
    if(!personId) {
      return;
    } 
    this.Swapi.getSomethink('characters', personId).then((character) => {
      this.setState({ character });
    });
  }
  render() {
    if(!this.state.character) {
      return <span>Select a person from list</span>
    }
    const { id, name, gender, hair_color, religion } = this.state.character;
    console.log(this.state.character)
    return (
      <div className="person-details card">
        <img className="person-image"
          src={id} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender:</span>
              <span>{id}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Hair color:</span>
              <span>{hair_color}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Religion:</span>
              <span>{religion}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
