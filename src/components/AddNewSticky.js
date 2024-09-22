import { useState } from "react";
import { useStickyContext } from "../contexts/stickyContextManager";
import { stickyColors, uniqueIdGenerator } from "../common/common";
import useClickOutside from "../common/useClickoutside";
import { stickyItemFormat } from "../common/newStickyFormat";
import { getSettingInnerItem, setSettingInnerItem } from "../utils/LocalStorage";

function AddNewSticky() {
  const { addItemToLocalStorage } = useStickyContext();
  const [isActive, setIsActive] = useState(false);
  const defaultStickyColors = getSettingInnerItem('stickyStyles')
  const [selectedColor, setSelectedColor] = useState(defaultStickyColors);  
  
  const createNewHandler = () => {
    const newItem = { ...stickyItemFormat };
    newItem.id = uniqueIdGenerator();
    newItem.styles = selectedColor;
    addItemToLocalStorage(newItem);
  }
  
  const selectedColorHandler = (event) => { 
    setIsActive(false)
    setSelectedColor(event)
    setSettingInnerItem('stickyStyles', event)
  }
  
  const elementRef = useClickOutside(() => setIsActive(false));
  // useEffect(() => {
  //   setSelectedColor(getSettingInnerItem('stickyStyles'))
  // }, [selectedColor])

  return (
    <div className={isActive ? 'add-new-block active' : 'add-new-block'} ref={elementRef}>
      <div className={isActive ? "color-selection isOpened" : "color-selection"}>
        <span className="selected-color" onClick={() => setIsActive(!isActive)}
          style={{
            '--selected-bg-light': selectedColor.light.headerBg,
            '--selected-bg-dark': selectedColor.dark.headerBg
          }}></span>
        <ul className="colors">
          {
            stickyColors?.map((list, index) => {
              return <li className={isActive ? 'active' : ""} key={index} onClick={() => selectedColorHandler(list)} style={{
                '--list-bg-light': list.light.headerBg,
                '--list-bg-dark': list.dark.headerBg
              }}></li>
            })
          }
        </ul>
      </div>
      <span className='text' onClick={() => createNewHandler()}>
        <i className="fa-solid fa-plus"></i> <span>New</span>
      </span>
    </div>
  )
}

export default AddNewSticky