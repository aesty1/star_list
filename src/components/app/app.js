import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import PeoplePage from '../people-page/people-page';

import './app.css';

const App = () => {
  return (
    <div>
      <Header />
      <RandomPlanet />
      <PeoplePage />
    </div>
  );
};

export default App;