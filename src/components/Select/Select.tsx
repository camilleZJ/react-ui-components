import React, {
  FC,
  useState,
  useRef,
  MouseEvent,
  useEffect,
  FunctionComponentElement,
} from "react";
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
  ExOptionProps,
} from "./SelectProps";

type tagpProps = { [key: string]: any };

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
  const tagsCon = useRef<HTMLDivElement>(null);
  const containerWidth = useRef<number>(0);
  const [value, setValue] = useState<string | React.ReactNode>(
    typeof defaultValue === "string" ? defaultValue : ""
  );
  const [selectedValues, setSelectedValues] = useState<any[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  );
  const [tagInfo, setTagInfo] = useState<tagpProps[]>([]);

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
    let showTag: any[] = [];

    const tagsInfo = React.Children.map(children, (child) => {
      const childElement = child as FunctionComponentElement<
        OptionProps & ExOptionProps
      >;
      const {
        value: optionValue,
        label,
        children: optionsChildren,
      } = childElement.props;

      if (Array.isArray(defaultValue)) {
        if (defaultValue.includes(optionValue)) {
          showTag.push(optionsChildren || (label ? label : optionValue));
        }
      } else if (typeof defaultValue === "string") {
        if (optionValue === defaultValue) {
          showTag.push(optionsChildren || (label ? label : optionValue));
        }
      }

      return {
        [optionValue]: optionsChildren || (label ? label : optionValue),
      };
    });

    if (showTag.length > 0) {
      multiple ? setSelectedValues(showTag) : setValue(showTag[0]);
    }
    if (tagsInfo) {
      setTagInfo(tagsInfo);
    }
  }, [children, defaultValue]);

  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current = containerRef.current.getBoundingClientRect().width;
    }
  });

  useEffect(() => {
    if (tagsCon.current && input.current) {
      const inittagsConHeight = tagsCon.current.getBoundingClientRect().height;
      const tagsConHeight = inittagsConHeight < 38 ? 38 : inittagsConHeight;

      input.current.style.height = tagsConHeight + "px";
      tagsCon.current.style.marginTop =
        (tagsConHeight - inittagsConHeight) / 2 + "PX";
    }
  }, [selectedValues]);

  const hideOptionList = () => {
    setMenuToggle(false);
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false);
    }
  };

  useClickOutside(containerRef, hideOptionList);

  const handleOptionClick = (
    value: string,
    hasSelected: boolean,
    isTag: boolean = false
  ) => {
    let tag = value;

    if (!isTag) {
      let showTag: string = "";
      for (let item of tagInfo) {
        showTag = item[value];
        if (showTag) {
          break;
        }
      }

      tag = showTag || value;
    }

    // click again to remove selected when is multiple mode
    if (multiple) {
      setValue("");

      //hasSelected: true已经选中  再次点击则是删除
      if (hasSelected) {
        //删除已选择的
        setSelectedValues((prevValues) => {
          return prevValues.filter((v) => v !== tag);
        });
      } else {
        //新增选中项
        setSelectedValues((prevValues) => {
          return [...prevValues, tag];
        });
      }
    } else {
      setValue(tag);
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
    const options = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<
        OptionProps & ExOptionProps
      >;
      const { displayName } = childElement.type;
      if (displayName === "Option") {
        return React.cloneElement(childElement, { index: "select-" + i });
      } else {
        console.error(
          "Warning: Select has a child which is not a Option component"
        );
      }
    });

    return options;
  };

  return (
    <div className={classes} ref={containerRef}>
      <div className="select-input" onClick={handleClick}>
        <Input
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          value={value?.toString() || ""}
          icon="angle-down"
          readOnly
          ref={input}
        />
      </div>

      <SelectContext.Provider value={passedContext}>
        <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
          <ul className="select-dropdown" data-testid="dropdown">{generateOptions()}</ul>
        </Transition>
      </SelectContext.Provider>

      {multiple && (
        <div
          className="selected-tags-con"
          style={{
            maxWidth: containerWidth.current - 32,
          }}
          ref={tagsCon}
        >
          {selectedValues.map((value, index) => {
            return (
              <span className="selected-tag" key={index}>
                {value}
                <Icon
                  icon="times"
                  onClick={() => handleOptionClick(value, true, true)}
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
  name: "select-name",
  multiple: false,
  disabled: false,
};
export default Select;
