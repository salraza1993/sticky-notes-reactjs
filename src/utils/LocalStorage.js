const storage = window.localStorage;
const _stickyNotesDefaultValue = JSON.stringify([]);
const _stickySettingsValue = JSON.stringify({
  grid: {
    gridLength: 5,
    structure: [],
  },
  themeAppearance: 'light',
  stickyStyles: {
    light: { headerBg: "#F5E58B", bodyBg: "#FFF7D1", bodyColor: "#333333" },
    dark: { headerBg: "#E6B905", bodyBg: "#333333", bodyColor: "#f2f2f2" },
  },
});
export const stickyNotesKey = 'stickyNotes';
export const stickySettingsKey = 'stickySettings';

export function getStickyNotes() {
  const is_stickyNotes = storage.getItem(stickyNotesKey);
  try {
    if (is_stickyNotes) {
      return JSON.parse(is_stickyNotes);
    } else {
      storage.setItem(stickyNotesKey, _stickyNotesDefaultValue);
      return JSON.parse(_stickyNotesDefaultValue);
    }
  } catch (error) {
    console.error("Error parsing sticky notes JSON:", error);
    storage.setItem(stickyNotesKey, _stickyNotesDefaultValue);
    return JSON.parse(_stickyNotesDefaultValue);
  }
}

export function updateAllStickyNotes(updatedData) {
  storage.setItem(stickyNotesKey, JSON.stringify(updatedData));
}

export function getInnerItem(itemId) {
  let allStickyItems = JSON.parse(storage.getItem(stickyNotesKey));
  const selectedItem = allStickyItems.find(stickyNote => stickyNote.id === itemId);
  return selectedItem;
}

export function setInnerItem(elementId, elementKey, value) {
  const allItems = JSON.parse(storage.getItem(stickyNotesKey));
  const updatedItem = allItems.find(stickyNote => stickyNote.id === elementId);
  if (updatedItem) {
    elementKey.split('.').reduce((obj, key, index, arr) => {
      if (index === arr.length - 1) {
        obj[key] = value;
      }
      return obj[key];
    }, updatedItem);
  }
  // Update the localStorage
  storage.setItem(stickyNotesKey, JSON.stringify(allItems));
}

export function setSingleStickyNotes(key = stickyNotesKey, newStickyNote) {
  let allStickyItems = JSON.parse(storage.getItem(key) || '[]');

  if (!Array.isArray(allStickyItems)) allStickyItems = [];
  const is_already_exists = allStickyItems.some(stickyNote => stickyNote.id === newStickyNote.id);

  if (!is_already_exists) {
    allStickyItems.push(newStickyNote);
    storage.setItem(key, JSON.stringify(allStickyItems));
  }
}

export function removeStickyNote(key, item) {
  let allStickyItems = JSON.parse(storage.getItem(key) || '[]');

  if (!Array.isArray(allStickyItems)) allStickyItems = [];
  allStickyItems = allStickyItems.filter(stickyNote => stickyNote.id !== item.id);
  storage.setItem(key, JSON.stringify(allStickyItems));
}

export function clearStickyNotes() {
  return storage.removeItem(stickyNotesKey);
}

export function getStickySettings() { 
  const is_stickySettingsExits = storage.getItem(stickySettingsKey);
  try {
    if (is_stickySettingsExits) {
      return JSON.parse(is_stickySettingsExits);
    } else {
      storage.setItem(stickySettingsKey, _stickySettingsValue);
      return JSON.parse(_stickySettingsValue);
    }
  } catch (error) {
    console.error("Error parsing sticky Settings JSON:", error);
    storage.setItem(stickySettingsKey, _stickySettingsValue);
    return JSON.parse(_stickySettingsValue);
  }
}

export function setSettingInnerItem(key, value) {
  const clonedSettings = getStickySettings();
  // clonedSettings[key] = value;
  key.split('.').reduce((obj, key, index, arr) => {
    if (index === arr.length - 1) {
      obj[key] = value;
    }
    return obj[key];
  }, clonedSettings);
  storage.setItem(stickySettingsKey, JSON.stringify(clonedSettings));
}
export function getSettingInnerItem(key) {
  const clonedSettings = getStickySettings();
  return clonedSettings[key];
}
