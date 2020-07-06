import React from "react";

import { Button, ButtonSize, ButtonType } from "./components/Button/Button";

function App() {
  return (
    <article className="App">
      <section className="btn-con">
        <Button
          btnType={ButtonType.Danger}
          size={ButtonSize.Small}
          onClick={() => {
            alert("hello");
          }}
        >
          danger button
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          primary button
        </Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com">
          link button
        </Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com" disabled={true}>
          link button
        </Button>
        <Button disabled={true}>disabled button</Button>
      </section>

      <section className="input-con"></section>
    </article>
  );
}

export default App;
