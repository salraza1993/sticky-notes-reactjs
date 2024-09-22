import { createContext, useContext, useEffect } from "react";
import { getSettingInnerItem, getStickySettings } from "../utils/LocalStorage";

const stickySettingsContext = createContext();
export function StickySettingsContextProvider({ children }) {
  const x = 'heelo';
  useEffect(() => {
    getStickySettings();
  }, [])
  return <stickySettingsContext.Provider value={x}>
    {children};
  </stickySettingsContext.Provider>
}
export function useStickySettingsContext() {
  return useContext(stickySettingsContext)
}