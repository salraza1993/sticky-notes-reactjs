  import React, { useState } from 'react'

  function GridStructure() {
    const [gridData, setGridData] = useState({ grids: 2500 });
    return (
      <div className='grid-container' style={{ '--grids': gridData.grids }}>
        <ul className="grids">
          {Array.from({ length: gridData.grids }).map((_, index) => (
            <li key={index} className={`grids-item grids-item-${index + 1}`}></li>
          ))}
        </ul>
      </div>
    )
  }

  export default GridStructure