import React from "react";
import classnames from "classnames";

interface btnProps {
  size: string;
  btnType: string
}



const Button: React.FC<btnProps> = (props) => {
  const cla = classnames({
    size: props.size,
  });

  return (
    <button className={cla} type="button" onClick={() => {}}>
      button
    </button>
  );
};

export default Button;
