import { JSX } from "solid-js/jsx-runtime";
import { Component } from "solid-js/types/render";
import { createSignal } from "solid-js";
import { Layout, withRockfish } from "./Layout";

export type RectProps = {
  x?: number;
  y?: number;
  width: number;
  height: number;
  fill: string;
};

export const Rect = (props: RectProps) => {
  return (
    <Layout
      layout={() => {
        return {
          left: props.x,
          top: props.y,
          width: props.width,
          height: props.height,
        };
      }}
      paint={(bbox: any) => {
        return (
          <rect
            x={bbox.left}
            y={bbox.top}
            width={bbox.width}
            height={bbox.height}
            fill={props.fill}
          />
        );
      }}
    />
  );
};
