import React, { FC, useState, useRef, MouseEvent, useEffect } from "react";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import Input from "../Input";
import Transition from "../Transition";
import Icon from "../Icon";
import {
  SelectProps,
  OptionProps,
  OptionsContextProps,
  SelectContext,
} from "./SelectProps";

/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'react-ui-components-pkg'
 * // 然后可以使用 <Select> 和 <Select.Option>
 * ~~~
 */
export const Select: FC<SelectProps> = (props) => {
  const {
    defaultValue,
    placeholder,
    disabled,
    multiple,
    name,
    onChange,
    onVisibleChange,
    children,
  } = props;
  const [menuOpen, setMenuToggle] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const containerWidth = useRef<number>(0);
  const [value, setValue] = useState<string>(
    typeof defaultValue === "string" ? defaultValue : ""
  );
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  );

  const classes = classNames("select-con", {
    "menu-is-open": menuOpen,
    "is-disabled": disabled,
    "is-multiple": multiple,
  });

  useEffect(() => {
    if (input.current) {
      input.current.focus();

      if (multiple && selectedValues.length > 0) {
        input.current.placeholder = "";
      } else if (placeholder) {
        input.current.placeholder = placeholder;
      }
    }
  }, [selectedValues, multiple, placeholder]);

  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current = containerRef.current.getBoundingClientRect().width;
    }
  });

  const hideOptionList = () => {
    setMenuToggle(false);
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false);
    }
  };

  useClickOutside(containerRef, hideOptionList);

  const handleOptionClick = (value: string, hasSelected: boolean) => {
    // click again to remove selected when is multiple mode
    if (multiple) {
      setValue("");

      //hasSelected: true已经选中  再次点击则是删除
      if (hasSelected) {
        //删除已选择的
        setSelectedValues((prevValues) => {
          return prevValues.filter((v) => v !== value);
        });
      } else {
        //新增选中项
        setSelectedValues((prevValues) => {
          return [...prevValues, value];
        });
      }
    } else {
      setValue(value);
      hideOptionList();
    }

    if (onChange) {
      onChange(value, [value]);
    }
  };

  const passedContext: OptionsContextProps = {
    onSelect: handleOptionClick,
    multiple,
    selectedValues: multiple ? selectedValues : [value],
  };

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();

    if (disabled) {
      return;
    }

    setMenuToggle(!menuOpen);
    if (onVisibleChange) {
      onVisibleChange(!menuOpen);
    }
  };

  const generateOptions = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<OptionProps>;
      const { displayName } = childElement.type;
      if (displayName === "Option") {
        return React.cloneElement(childElement, { index: "select-" + index });
      } else {
        console.error(
          "Warning: Select has a child which is not a Option component"
        );
      }
    });
  };

  return (
    <div className={classes} ref={containerRef}>
      <div className="select-input" onClick={handleClick}>
        <Input
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          value={value}
          icon="angle-down"
          readOnly
          ref={input}
        />
      </div>

      <SelectContext.Provider value={passedContext}>
        <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
          <ul className="select-dropdown">{generateOptions()}</ul>
        </Transition>
      </SelectContext.Provider>

      {multiple && (
        <div
          className="selected-tags-con"
          style={{
            maxWidth: containerWidth.current - 32,
          }}
        >
          {selectedValues.map((value, index) => {
            return (
              <span className="selected-tag" key={index}>
                {value}
                <Icon
                  icon="times"
                  onClick={() => handleOptionClick(value, true)}
                />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
Select.defaultProps = {
  placeholder: "请选择",
  name: "zj-select",
  multiple: false,
  disabled: false,
  //   clearable:false
};
export default Select;
