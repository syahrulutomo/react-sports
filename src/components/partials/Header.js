import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { BurgerButton } from '../base';

export const PartialHeader = () => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  }

  return (
    <React.Fragment>
      <header className="app-header">
        <div className="app-header-container">
          <p className="app-logo">Jogo Sports</p>
          <BurgerButton active={active} handleClick={handleClick} />
        </div>
      </header>
      {
        active ?
        <Sidebar/> : ''
      }
    </React.Fragment>
  );
};
