import { createContext, useState } from "react";

type AuthContextType = {
  pldMenu: number,
  setPldMenu: any,

  economyMenu: number,
  setEconomyMenu: any
}

export const MenuContext = createContext({} as AuthContextType)

export function MenuProvider({children}: {children: React.ReactNode}) {
  const [pldMenu, setPldMenu] = useState<number>(0)
  const [economyMenu, setEconomyMenu] = useState<number>(0)

  return (
    <MenuContext.Provider value={{pldMenu, setPldMenu, economyMenu, setEconomyMenu}}>
      {children}
    </MenuContext.Provider>
  )
}
