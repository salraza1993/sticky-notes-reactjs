import { stickyColors, uniqueIdGenerator } from "./common";
export const defaultStickyColors = stickyColors[0];
export const placeholderText = 'Placeholder Dummy Text!';
export const gutter = 20;
let windowWidth = window.innerWidth - 40;
export const cardWidth = ((windowWidth / 5) - gutter) < 350 ? 350 : ((windowWidth / 5) - gutter);
export const stickyItemFormat = {
  id: uniqueIdGenerator(),
  content: placeholderText,
  width: cardWidth,
  positions: { x: 0, y: 0 },
  styles: defaultStickyColors
}; 