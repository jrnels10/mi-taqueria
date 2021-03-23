import React, { createContext } from "react";
import { TaqueriaContextData } from "./Interfaces";

const taqueriaContextDefaultValue: TaqueriaContextData = {
  taqueria: [],
};

export const TaqueriaContext = createContext<TaqueriaContextData>(
  taqueriaContextDefaultValue
);
