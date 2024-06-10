import React, { ReactElement } from "react";
import { AppState } from "../types";

export interface IAppContext {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}
type AppContextProviderProps = {
  value: AppState;
  children: ReactElement;
};
const AppContext = React.createContext({} as IAppContext);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  value,
  children,
}) => {
  const [state, setState] = React.useState(value);

  React.useEffect(() => {
    setState(value);
  }, [value]);
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
