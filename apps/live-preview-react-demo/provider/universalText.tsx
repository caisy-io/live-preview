import React, { useContext } from "react";
import { IGenUniversalText } from "../utils/types_gen";
import { useCaisyUpdates } from "@caisy/live-preview-react";

const UniversalTextProviderContext = React.createContext<
  Omit<IGenUniversalText, "__typename">
>({});

export const useUniversalText = (): Omit<IGenUniversalText, "__typename"> => {
  return useContext(UniversalTextProviderContext);
};

export const UniversalTextProvider: React.FC<
  React.PropsWithChildren<{
    universalText: IGenUniversalText;
  }>
> = ({ universalText, children }) => {
  const universalTextUpdated = useCaisyUpdates(universalText);

  return (
    <UniversalTextProviderContext.Provider value={universalTextUpdated}>
      {children}
    </UniversalTextProviderContext.Provider>
  );
};
