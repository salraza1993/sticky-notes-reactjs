import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getStickyNotes, removeStickyNote, setInnerItem, setSingleStickyNotes, stickyNotesKey, updateAllStickyNotes } from '../utils/LocalStorage';
import { cardWidth, gutter } from '../common/newStickyFormat';

const stickyContexts = createContext();
export function StickyContextProvider({ children }) {
  const stickyRefElement = useRef(null);
  const getAllStickyNotesFromLocalStorage = getStickyNotes();
  const [stickyNotesList, setStickyNotesLists] = useState(getAllStickyNotesFromLocalStorage);
  const [updatedStickyNotesList, setUpdatedStickyNotesList] = useState(getAllStickyNotesFromLocalStorage);

  function resetPositions() { 
    const allItems = getStickyNotes();
    const updatedItems = allItems?.map((item, index) => {
      setItemPositions(item, 'x', index);
      return item;
    });
    updateAllStickyNotes(updatedItems)
    setUpdatedStickyNotesList(getStickyNotes())
  }
  function setItemPositions(item, positionType, itemsLength) {
    const allItems = getStickyNotes();
    let lastItemPositionX = allItems[allItems.length - 1]?.positions.x;

    let windowWidth = window.innerWidth - 40;
    let startPosition = (cardWidth + gutter) * itemsLength;

    if ((startPosition + cardWidth) > windowWidth) {
      startPosition = lastItemPositionX - (cardWidth + gutter);
      item.positions.y = 50;
    }
    item.positions[positionType] = startPosition;
  }

  
  function addItemToLocalStorage(item) {
    setItemPositions(item, 'x', stickyNotesList.length);
    
    setSingleStickyNotes(stickyNotesKey, item);
    setStickyNotesLists(getStickyNotes())
  }

  function removeItemToLocalStorage(item) {
    removeStickyNote(stickyNotesKey, item);
    setStickyNotesLists(getStickyNotes())
    // resetPositions();
  }
  function setInnerItemContent(itemId, itemKey, content) { 
    setInnerItem(itemId, itemKey, content);
    setStickyNotesLists(getStickyNotes())
  }
  
  // initialize the sticky note in localStorage
  useEffect(() => {
    getStickyNotes();    
    // resetPositions();
  }, [])

  useEffect(() => { getStickyNotes(); }, [stickyNotesList]);
  useEffect(() => { getStickyNotes(); }, [updatedStickyNotesList]);

  return <stickyContexts.Provider value={{
    stickyRefElement, stickyNotesList, addItemToLocalStorage, removeItemToLocalStorage, setInnerItemContent
  }}>{children}</stickyContexts.Provider>;
}

export function useStickyContext() {
  return useContext(stickyContexts);
}