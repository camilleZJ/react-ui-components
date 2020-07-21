import React, {
  FC,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import classNames from "classnames";
import { AutocompleteProps, DataSourceType } from "./AutocompleteProps";
import Input from "../Input";
import Icon from "../Icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition";

/**
 * ~~~js
 * 
 * ~~~
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择
 * ## 引用方法
 * ~~~js
 * import { Autocomplete } from 'antd-components'
 * ~~~
 */
export const Autocomplete: FC<AutocompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    renderOptions,
    value,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value as string); //input的value
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]); //提示的下拉列表数据
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });
  const debouncedValue = useDebounce(inputValue, 500);
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(results);
        // setShowDropdown(true);
        if (results.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      // setSuggestions([]);
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  }, [debouncedValue, fetchSuggestions]);

  //   const renderTemplate = (item: string) => {
  //     return renderOptions ? renderOptions(item) : item;
  //   };
  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);

    triggerSearch.current = true;
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    // setSuggestions([]);
    setShowDropdown(false);

    if (onSelect) {
      onSelect(item);
    }

    triggerSearch.current = false;
  };

  const hightlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }

    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: //回车
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38: //向上箭头
        hightlight(highlightIndex - 1);
        break;
      case 40: //向下箭头
        hightlight(highlightIndex + 1);
        break;
      case 27: //esc
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        nimation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className="suggestion-list">
          {suggestions.map((item, index) => {
            const cnames = classNames("suggestion-item", {
              "is-active": index === highlightIndex,
            });

            return (
              <li
                className={cnames}
                key={index}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className="auto-complete-con" ref={componentRef}>
      <Input
        value={inputValue}
        {...restProps}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {loading && (
        <div className="suggstions-loading-icon">
          <Icon icon="spinner" spin />
        </div>
      )}
      {generateDropdown()}
    </div>
  );
};

export default Autocomplete;
