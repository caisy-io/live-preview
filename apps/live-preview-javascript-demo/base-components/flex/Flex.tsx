import React from "react";
import { SFlex, IFlex } from "./styles/SFlex";

export const Flex: React.FC<React.PropsWithChildren<IFlex & React.HTMLAttributes<HTMLDivElement>>> =
  SFlex;
