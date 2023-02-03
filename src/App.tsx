import { Component, createEffect, createSignal } from "solid-js";

import styles from "./App.module.css";
import { Bluefish } from "./Bluefish";
import { Row } from "./Row";
import { Rect } from "./Rect";

const App: Component = () => {
  const [spacing, setSpacing] = createSignal(0);
  const [horizontal, setHorizontal] = createSignal(true);

  return (
    <div class={styles.App}>
      <Bluefish width={1500} height={500}>
        <Row x={100} y={100} spacing={spacing()} horizontal={horizontal()}>
          <Rect width={50} height={50} fill="red" />
          <Rect width={50} height={50} fill="blue" />
          <Rect width={50} height={50} fill="green" />
        </Row>
      </Bluefish>
      <input
        type="range"
        min="0"
        max="10"
        value={spacing()}
        onInput={(e) => setSpacing(+e.currentTarget.value)}
      />
      <input
        type="checkbox"
        checked={horizontal()}
        onChange={() => {
          setHorizontal(!horizontal());
        }}
      />
    </div>
  );
};

export default App;
