import React, { FC, useContext, MouseEvent } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import { OptionProps, SelectContext } from "./SelectProps";

export const Option: FC<OptionProps & { children?: React.ReactNode }> = (
  props
) => {
  const { value, label, disabled, children } = props;
  const showTag = children || (label ? label : value);

  const context = useContext(SelectContext);
  const isSelected = context.selectedValues.includes(showTag);

  const classes = classNames("select-item", {
    "is-disabled": disabled,
    "is-selected": isSelected,
  });

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    if (!disabled && context.onSelect) {
      context.onSelect(value, isSelected);
    }
  };

  return (
    <li className={classes} key={value} onClick={handleClick}>
      {showTag}
      {context.multiple && isSelected && <Icon icon="check" />}
    </li>
  );
};
Option.displayName = "Option";
export default Option;
