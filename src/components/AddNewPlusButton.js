import React, { useEffect } from 'react'
import { useStickyContext } from '../contexts/stickyContextManager';
import { stickyItemFormat } from '../common/newStickyFormat';
import { uniqueIdGenerator } from '../common/common';

function AddNewPlusButton({ colors }) {
  const { addItemToLocalStorage } = useStickyContext();
  const createNewHandler = () => {    
    const newItem = { ...stickyItemFormat };
    newItem.id = uniqueIdGenerator();
    newItem.styles = colors;
    addItemToLocalStorage(newItem);
  }

  useEffect(() => {}, [])

  return (
    <div
      className="icon plus"
      onClick={() => createNewHandler()}
      style={{ marginInlineEnd: 'auto' }}>
      <i className="fa-solid fa-plus"></i>  
    </div>
  )
}

export default AddNewPlusButton