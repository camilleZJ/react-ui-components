import React from "react";
import { CSSTransition } from "react-transition-group";

const Transition = () => {
  return (
    <CSSTransition timeout={300} classNames="alert" unmountOnExit>
      {" "}
      <p>This alert message is being transitioned in and out of the DOM.</p>
    </CSSTransition>
  );
};

export default Transition;
