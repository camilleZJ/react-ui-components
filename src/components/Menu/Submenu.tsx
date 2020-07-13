import React, { FC, useState, useContext } from "react";
import classNames from "classnames";
import { SubMenuProps, MenuItemProps, menuContext } from "./MenuProps";

const SubMenu: FC<SubMenuProps> = (props) => {
  const { index, title, children, className, style } = props;
  const menuContextInfo = useContext(menuContext);
  const isOpend = index === menuContextInfo.index; //???????
  const [menuOpen, setOpen] = useState(isOpend);

  const classes = classNames("menu-item submenu-item", className, {});

  function renderChildren() {
    const subMenuClasses = classNames("submenu-con", {
      "menu-opened": menuOpen,
    });
    const childrenComponents = React.Children.map(
      children,
      (child, childIndex) => {
        const childElement = child as React.FunctionComponentElement<
          MenuItemProps
        >;
        const { displayName } = childElement.type;
        if (displayName === "MenuItem") {
          return React.cloneElement(childElement, {
            index: `${index}-${childIndex}`,
          });
        } else {
          console.error(
            "Warning: SubMenu has a child which is not a MenuItem component"
          );
        }
      }
    );

    return <ul className={subMenuClasses}>{childrenComponents}</ul>;
  }

  return (
    <li key={index} className={classes} style={style}>
      <p className="submenu-title">{title}</p>
      {renderChildren}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
