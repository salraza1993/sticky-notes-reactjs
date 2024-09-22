import StickyItem from './StickyItem';
import { useStickyContext } from '../contexts/stickyContextManager';

function StickyNotes() {
  const { stickyNotesList, stickyRefElement } = useStickyContext();
  
  return (
    <>
      <div className="sticky-notes-container container" ref={stickyRefElement}>
        {
          stickyNotesList && stickyNotesList.map((item) => {
            return <StickyItem key={item.id} data={item} />
          })
        }
      </div>
    </>
  )
}

export default StickyNotes