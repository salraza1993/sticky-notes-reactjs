import React from 'react'
import AddNewSticky from './AddNewSticky';
import { useStickyContext } from '../contexts/stickyContextManager';

function Header() {
  const { removeLastItem, clearAll, resetPositions } = useStickyContext();
  return (
    <header className='main-header'>
      <div className="start-block">
        <AddNewSticky />
        <div className="buttons">
          <button className="button" onClick={removeLastItem}>
            <i className="fa-solid fa-trash-can"></i> 
            <span>Last Item</span>
          </button>
          <button className="button" onClick={clearAll}>
            <i className="fa-solid fa-trash-can"></i> 
            <span>Clear All</span>
          </button>
        </div>
      </div>
      <div className="end-block">
        <div className="buttons">
          <button className="button" onClick={resetPositions}>
            <i className="fa-solid fa-rotate"></i> 
            <span>Reset Positions</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header