import React, { Fragment } from "react";
// import { storiesOf } from "@storybook/react";
import Icon from "./icon";
import Button from "../Button";

const style = { margin: "0 15px" };
export const defaultIcon = () => {
  return (
    <Fragment>
      <Icon icon="check" size="3x" style={style} />
      <Icon icon="times" size="3x" style={style} />
      <Icon icon="anchor" size="3x" style={style} />
      <Icon icon="trash" size="3x" style={style} />
      <Button btnType="primary" disabled={false} size="lg" style={style}>
        <Icon icon="check" />
        check
      </Button>
    </Fragment>
  );
};
defaultIcon.story = {
  name: "Icon",
};

export default {
  title: "Icon图标",
  component: "Icon",
};

// storiesOf("Icon图标", module).add("Icon图标", defaultIcon);
