import React, { useEffect, useRef } from "react";
import { getInnerItem, getStickyNotes, setInnerItem } from "../utils/LocalStorage";

function useDragger(elementId) {
  const isClicked = useRef(false);
  const coords = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0 });
  
  useEffect(() => {
    const target = document.getElementById(elementId);
    const targetParent = document.getElementById(elementId).parentNode;
    const parentId = targetParent.getAttribute('id');

    if (!target) throw new Error("Element with given id doesn't exist");
    const container = target.parentElement;
    if (!container) throw new Error("target element must have a parent");

    const onMouseDown = (e) => {
      // console.log('onMouseDown', e);
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = (e) => {
      // console.log('onMouseUp', e);
      isClicked.current = false;
      coords.current.lastX = targetParent.offsetLeft;
      coords.current.lastY = targetParent.offsetTop;
    };

    const onMouseMove = (e) => {
      if (coords.current.startX === 0) {
        onMouseDown(e);
        onMouseUp(e);
      }
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      targetParent.style.insetBlockStart = `${nextY}px`;
      targetParent.style.insetInlineStart = `${nextX}px`;
      setInnerItem(parentId, 'positions', { x: nextX, y: nextY })
      // targetParent.style.setProperty("--position-x-start", `${nextY}px`);
      // targetParent.style.setProperty("--position-y-start", `${nextX}px`);
    };

    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      target.removeEventListener('mousedown', onMouseDown);
      target.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };

    return cleanup;
  }, [elementId]);
}

export default useDragger;
