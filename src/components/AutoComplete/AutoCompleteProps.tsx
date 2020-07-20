import { InputProps } from "../Input/InputProps";
import { ReactElement } from "react";

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => string[];
  onSelect?: (item: string) => void;
  renderOptions?: (item: DataSourceType) => ReactElement;
}
