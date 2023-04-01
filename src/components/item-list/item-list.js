import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Loading from '../loading';
import './item-list.css';

export default class ItemList extends Component {
  Swapi = new SwapiService();
  state = {
    characters: []
  }
  componentDidMount () {
    this.Swapi.getSomethinkArr('characters').then((characters) => {
      this.setState({characters})
    });
  }
  renderItems(arr) {
    
    return arr.map(({id, name}) => {
      return (
        <li className='list-group-item' key={id} onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      );
    });
  }
  render() {
    const { characters } = this.state;
    if(!characters) {
      return (
        <Loading />
      )
    }
    const items = this.renderItems(characters);
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
