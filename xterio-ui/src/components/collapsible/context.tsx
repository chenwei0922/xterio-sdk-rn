import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

let seed = 1;

interface CollapsibleContextState {
  unique: boolean;
  openKey?: number;
  getId(): number;
  setOpenKey(k: number): void;
}

interface CollapsibleContextProps extends PropsWithChildren {
  unique: boolean;
}

const CollapsibleContext = createContext<CollapsibleContextState>(
  {} as CollapsibleContextState
);

export const CollapsibleProvider = (props: CollapsibleContextProps) => {
  const { children, unique } = props;

  const [openKey, setOpenKey] = useState<number>();

  const getId = useCallback(() => {
    return seed++;
  }, []);

  return (
    <CollapsibleContext.Provider
      value={{ unique: !!unique, openKey, setOpenKey, getId }}
    >
      {children}
    </CollapsibleContext.Provider>
  );
};
export const useCollapsibleContext = () => {
  return useContext(CollapsibleContext);
};
