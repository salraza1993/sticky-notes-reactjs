import { useEffect, useRef, useState } from "react";
import { useStickyContext } from "../contexts/stickyContextManager";
import useClickOutside from "../common/useClickoutside";
import { getInnerItem } from "../utils/LocalStorage";
import AddNewPlusButton from "./AddNewPlusButton";
import { removeInlineStyles, stickyColors } from "../common/common";
import Draggable from 'react-draggable'; // The default

function StickyItem({ data }) {
  const editableRef = useRef(null);
  const stickyNoteRef = useRef(null);
  const { removeItemToLocalStorage, setInnerItemContent } = useStickyContext();

  const [itemId, setItemId] = useState(data.id);
  const [showAlert, setShowAlert] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [editableContent, setEditableContent] = useState(data.content);
  const [stickyColor, setStickyColor] = useState(data.styles);
  const [stickyPositions, setStickyPositions] = useState(data.positions);
  const [dragState, setDragState] = useState({
    activeDrags: 0,
    deltaPosition: { x: 0, y: 0 },
    controlledPosition: {
      x: 0, y: 0
    }
  })

  let activeItem = { content: '', styles: {} };

  const handleFocus = (stickyId) => {
    if (editableRef.current) {
      setIsActive(true);
    }
  };
  const handleBlur = (stickyId) => {
    if (editableRef.current) {
      setIsActive(false);
      const htmlContent = editableRef.current.innerHTML;
      activeItem.content = removeInlineStyles(htmlContent);
      setEditableContent(activeItem.content);

      setInnerItemContent(stickyId, 'content', activeItem.content);
    }

  };
  const handleInput = (stickyId) => {
    if (editableRef.current) {
      setIsActive(true);
      activeItem = getInnerItem(stickyId);
    }
  };
  const deleteStickyNoteHandler = () => removeItemToLocalStorage(data);
  const closeAlert = () => setShowAlert(false);
  const elementRef = useClickOutside(() => setShowAlert(false));
  const colorPaletteRef = useClickOutside(() => setShowColorPalette(false));
  const colorSelectionHandler = (colors, item) => {
    setInnerItemContent(item.id, 'styles', colors);
    setShowColorPalette(false)
    setStickyColor(colors)
  }
  const handleDrag = (e, ui) => {
    const { x, y } = dragState.deltaPosition;
    setDragState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    })
    setInnerItemContent(itemId, 'positions', dragState.deltaPosition);

  };
  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  };
  const onStart = (itemId) => {
    console.log('onStart: ', dragState);

  };
  const onStop = (itemId) => {
    console.log('onStop: ', dragState);
    setInnerItemContent(itemId, 'positions', dragState.deltaPosition);
  };

  const onControlledDragStop = (e, position) => {
    onControlledDrag(e, position);
    onStop();
  };
  

  useEffect(() => {
    // console.log('stickyPositions', stickyPositions);
  }, []);
  
  const styles = {
    '--card-header-bg-light': stickyColor.light.headerBg,
    '--card-body-bg-light': stickyColor.light.bodyBg,
    '--card-body-color-light': stickyColor.light.bodyColor,
    '--card-header-bg-dark': stickyColor.dark.headerBg,
    '--card-body-bg-dark': stickyColor.dark.bodyBg,
    '--card-body-color-dark': stickyColor.dark.bodyColor,
    '--position-x-start': `${stickyPositions.x}px`,
    '--position-y-start': `${stickyPositions.y}px`,
    '--card-width': `${data.width}px`,
  };

  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      onStart={onStart}
      onDrag={handleDrag}
      onStop={onStop}
    >
      <div
        ref={elementRef}
        style={styles}
        className={isActive ? 'active sticky-note-card' : 'sticky-note-card'}>
        <div className="sticky-note-card__header" ref={stickyNoteRef}>
          <AddNewPlusButton colors={stickyColor} />
          <div className="icon remove" onClick={() => setShowAlert(true)}><i className="fa-solid fa-trash-can"></i></div>
          <div className="icon more" onClick={() => setShowColorPalette(true)}><i className="fa-solid fa-ellipsis"></i></div>
        </div>
        <div className='sticky-note-card__body'>
          <div
            contentEditable
            className="sticky-content"
            placeholder="Hello"
            ref={editableRef}
            onFocus={() => handleFocus(data.id)}
            onBlur={() => handleBlur(data.id)}
            onInput={() => handleInput(data.id)}
            dangerouslySetInnerHTML={{ __html: editableContent || "Enter you notes" }}
          ></div>
        </div>
        <div className="sticky-note-card__footer">
          <div className='icon bold'><i className="fa-solid fa-bold"></i></div>
          <div className='icon italic'><i className="fa-solid fa-italic"></i></div>
          <div className='icon underline'><i className="fa-solid fa-underline"></i></div>
          <div className='icon strikethrough'><i className="fa-solid fa-strikethrough"></i></div>
          <div className='icon list'><i className="fa-solid fa-list"></i></div>
        </div>

        <div className={showAlert ? "alert active" : "alert"}>
          <p>Are you sure?</p>
          <div className="buttons">
            <div className="button remove" onClick={deleteStickyNoteHandler}><i className="fa-solid fa-trash-can"></i></div>
            <div className="button discard" onClick={closeAlert}><i className="fa-solid fa-xmark"></i></div>
          </div>
        </div>

        <div ref={colorPaletteRef} className={showColorPalette ? "more-options active" : "more-options"}>
          <ul className="colors-palette">
            {
              stickyColors?.map((list, index) => {
                return <li
                  className={isActive ? 'active' : ""}
                  onClick={() => colorSelectionHandler(list, data)}
                  key={index}
                  style={{
                  '--list-bg-light': list.light.headerBg,
                  '--list-bg-dark': list.dark.headerBg
                }}></li>;
              })
            }
          </ul>
        </div>
      </div>
    </Draggable>
  );
}

export default StickyItem;