import React from 'react';

import './header.css';

const Header = () => {
  return (
    <div className="header d-flex">
      <h3>
        <a href="#">
          South park
        </a>
      </h3>
      <ul className="d-flex">
        <li>
          <a href="#">Characters</a>
        </li>
        <li>
          <a href="#">Episodes</a>
        </li>
        <li>
          <a href="#">Locations</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;