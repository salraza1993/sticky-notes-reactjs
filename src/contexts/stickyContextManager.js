import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { clearStickyNotes, getSettingInnerItem, getStickyNotes, getStickySettings, removeStickyNote, setInnerItem, setSettingInnerItem, setSingleStickyNotes, stickyNotesKey, updateAllStickyNotes } from '../utils/LocalStorage';
import { cardWidth, gutter } from '../common/newStickyFormat';

const stickyContexts = createContext();
export function StickyContextProvider({ children }) {
  const stickyRefElement = useRef(null);
  const getAllStickyNotesFromLocalStorage = getStickyNotes();
  const [stickyNotesList, setStickyNotesLists] = useState(getAllStickyNotesFromLocalStorage);
  const [resetPositionsState, setResetPositionsState] = useState(0);

  function setItemPositions() {
    const windowWidth = window.innerWidth - 40;
    const allItems = getStickyNotes()
    const { structure } = getSettingInnerItem('grid');
    const rowHeight = 50;

    structure.forEach((row, rowIndex) => {
      const isEvenRow = rowIndex % 2 === 0;
      row.forEach((itemIndex, colIndex) => {
        let startPositionX;
        let startPositionY = rowIndex === 0 ? 0 : rowHeight * rowIndex;
        if (isEvenRow) {
          startPositionX = (cardWidth + gutter) * colIndex;
        } else {
          startPositionX = windowWidth - ((cardWidth + gutter) * (colIndex + 1));
        }
        if (allItems[itemIndex]) {
          allItems[itemIndex].positions = { x: startPositionX, y: startPositionY };
        }
      });
    });
    updateAllStickyNotes(allItems);
    setStickyNotesLists([...allItems]);
  }

  function setGridStructureHandler(array) {
    const { gridLength } = getSettingInnerItem('grid');
    const structured = [];
    let grouped = [];
    array.forEach((item, index) => {
      grouped.push(index);
      if ((index + 1) % gridLength === 0) {
        structured.push(grouped);
        grouped = [];
      }
    });
    if (grouped.length) { structured.push(grouped); }
    setSettingInnerItem('grid.structure', structured);
  }

  function addItemToLocalStorage(item) {
    const allItems = getStickyNotes();
    setGridStructureHandler(allItems);
    setSingleStickyNotes(stickyNotesKey, item);

    const updatedList = getStickyNotes();
    setStickyNotesLists([...updatedList])
    setGridStructureHandler(updatedList);
    setItemPositions();       
  }

  function resetPositions() { 
    setResetPositionsState(prevKey => prevKey + 1)
  }

  function removeItemToLocalStorage(item) {
    removeStickyNote(stickyNotesKey, item);
    const allItems = getStickyNotes();
    setGridStructureHandler(allItems);
    setStickyNotesLists([...allItems])
  }

  function setInnerItemContent(itemId, itemKey, content) {
    setInnerItem(itemId, itemKey, content);
    const allItems = getStickyNotes();
    setStickyNotesLists([...allItems]);
  }

  function clearAll() {
    clearStickyNotes();
    setStickyNotesLists([]);
    setSettingInnerItem('grid.structure', []);
  }

  function removeLastItem() {
    const allItems = getStickyNotes();
    const lastItem = allItems[allItems.length - 1];
    removeItemToLocalStorage(lastItem);
    setStickyNotesLists([...allItems]);
  }

  useEffect(() => {
    setItemPositions();
    const storedStickyNotes = getStickyNotes();
    setStickyNotesLists([...storedStickyNotes]);
  }, []);

  return (
    <stickyContexts.Provider value={{
      stickyRefElement,
      stickyNotesList,
      addItemToLocalStorage,
      removeItemToLocalStorage,
      setInnerItemContent,
      removeLastItem,
      clearAll,
      resetPositions,
      resetPositionsState
    }}>
      {children}
    </stickyContexts.Provider>
  );
}

export function useStickyContext() {
  return useContext(stickyContexts);
}
