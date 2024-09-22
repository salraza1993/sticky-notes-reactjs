import { useStickyContext } from '../contexts/stickyContextManager';
import { stickyItemFormat } from '../common/newStickyFormat';
import { uniqueIdGenerator } from '../common/common';
import { getSettingInnerItem, setSettingInnerItem } from '../utils/LocalStorage';

function AddNewPlusButton({ colors }) {
  const { addItemToLocalStorage } = useStickyContext();
  const createNewHandler = () => {    
    const newItem = { ...stickyItemFormat };
    newItem.id = uniqueIdGenerator();
    setSettingInnerItem('stickyStyles', colors)
    newItem.styles = getSettingInnerItem('stickyStyles');
    addItemToLocalStorage(newItem, 1);
  }
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