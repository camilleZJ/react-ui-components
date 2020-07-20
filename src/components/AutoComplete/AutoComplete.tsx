import React, { useState, ChangeEvent } from "react";
import classNames from "classnames";
import { AutoCompleteProps, DataSourceType } from "./AutoCompleteProps";
import Input from "../Input";

// import Icon from "../Icon";
// import Transition from "../Transition";

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    renderOptions,
    value,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value); //input的value
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]); //提示的下拉列表数据

  //   console.log(suggestions);
  //   const renderTemplate = (item: string) => {
  //     return renderOptions ? renderOptions(item) : item;
  //   };
  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item: string) => {
    setInputValue(item);
    setSuggestions([]);

    if (onSelect) {
      onSelect(item);
    }
  };

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="auto-complete-con">
      <Input value={inputValue} {...restProps} onChange={handleChange} />
      {setSuggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
