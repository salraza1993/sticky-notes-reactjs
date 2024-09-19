import React from 'react'
import AddNewSticky from './AddNewSticky';

function Header() {
  return (
    <header className='main-header'>
      <div className="start-block">
        <AddNewSticky />
      </div>
      <div className="end-block"></div>
    </header>
  )
}

export default Header